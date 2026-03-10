-- Dead Man's Switch - Database Schema

-- 1. Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT, -- Added phone number to profile
    onboarding_completed BOOLEAN DEFAULT false, -- Track onboarding status
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Counter Status Table
CREATE TABLE IF NOT EXISTS public.counter_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE UNIQUE NOT NULL,
    last_reset_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    target_time_interval INTERVAL DEFAULT '24 hours' NOT NULL, -- How often to reset
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Reset Logs
CREATE TABLE IF NOT EXISTS public.logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
    reset_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_agent TEXT,
    ip_address INET,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 4. Notification Targets
DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM ('email', 'whatsapp');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.notification_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
    type notification_type NOT NULL,
    destination_value TEXT NOT NULL, -- Email address or phone number
    target_name TEXT, -- Personalized name for the target
    message TEXT, -- Custom message for this target
    enabled BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counter_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_targets ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own counter" ON public.counter_status;
CREATE POLICY "Users can view their own counter" ON public.counter_status FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own counter" ON public.counter_status;
CREATE POLICY "Users can update their own counter" ON public.counter_status FOR UPDATE USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can view their own logs" ON public.logs;
CREATE POLICY "Users can view their own logs" ON public.logs FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own logs" ON public.logs;
CREATE POLICY "Users can insert their own logs" ON public.logs FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own targets" ON public.notification_targets;
CREATE POLICY "Users can view their own targets" ON public.notification_targets FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own targets" ON public.notification_targets;
CREATE POLICY "Users can manage their own targets" ON public.notification_targets FOR ALL USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name, phone)
    VALUES (
        new.id, 
        new.email, 
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'phone'
    );
    
    INSERT INTO public.counter_status (user_id)
    VALUES (new.id);
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_modtime ON public.profiles;
CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_counter_status_modtime ON public.counter_status;
CREATE TRIGGER update_counter_status_modtime BEFORE UPDATE ON public.counter_status FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_notification_targets_modtime ON public.notification_targets;
CREATE TRIGGER update_notification_targets_modtime BEFORE UPDATE ON public.notification_targets FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- CONFIGURAÇÃO DE NOTIFICAÇÃO (Exemplo)
-- Para ativar a notificação no número solicitado, execute o SQL abaixo substituindo o USER_ID:
-- INSERT INTO public.notification_targets (user_id, type, destination_value)
-- VALUES ('SEU_USER_ID_AQUI', 'whatsapp', '+5513981326869');
