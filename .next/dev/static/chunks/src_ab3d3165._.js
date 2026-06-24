(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
const createClient = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://dlaciewigpwwxwetclnu.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsYWNpZXdpZ3B3d3h3ZXRjbG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNTM5OTIsImV4cCI6MjA5NzgyOTk5Mn0.gMompL8Vkgx-yENcycfZTt6TKmsSLBAar-sQULjC1bU"));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/settings/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key.js [app-client] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
;
var _s = __turbopack_context__.k.signature();
'use client';
const dynamic = 'force-dynamic';
;
;
;
;
function SettingsPage() {
    _s();
    // Basic states
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Data states
    const [targets, setTargets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profileData, setProfileData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        full_name: '',
        email: '',
        phone: ''
    });
    const [testLoading, setTestLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Security states
    const [passwordData, setPasswordData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        new: '',
        confirm: ''
    });
    const [savingPassword, setSavingPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mfaState, setMfaState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isEnrolled: false,
        factorId: '',
        qrCode: '',
        verifyCode: '',
        loading: false
    });
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsPage.useEffect": ()=>{
            setMounted(true);
            const fetchData = {
                "SettingsPage.useEffect.fetchData": async ()=>{
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) {
                        router.push('/login');
                        return;
                    }
                    // Profile
                    const { data: profileObj } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
                    setProfile(profileObj);
                    setProfileData({
                        full_name: profileObj?.full_name || '',
                        email: user.email || '',
                        phone: profileObj?.phone || ''
                    });
                    // Targets
                    const { data: targetsData } = await supabase.from('notification_targets').select('*').eq('user_id', user.id);
                    setTargets(targetsData || []);
                    // MFA Status
                    const { data: mfaData, error: mfaError } = await supabase.auth.mfa.listFactors();
                    if (!mfaError && mfaData && mfaData.totp.length > 0) {
                        const verifiedFactor = mfaData.totp.find({
                            "SettingsPage.useEffect.fetchData.verifiedFactor": (f)=>f.status === 'verified'
                        }["SettingsPage.useEffect.fetchData.verifiedFactor"]);
                        if (verifiedFactor) {
                            setMfaState({
                                "SettingsPage.useEffect.fetchData": (prev)=>({
                                        ...prev,
                                        isEnrolled: true,
                                        factorId: verifiedFactor.id
                                    })
                            }["SettingsPage.useEffect.fetchData"]);
                        }
                    }
                    setLoading(false);
                }
            }["SettingsPage.useEffect.fetchData"];
            fetchData();
        }
    }["SettingsPage.useEffect"], [
        supabase,
        router
    ]);
    // --- Profile Handlers ---
    const handleSaveProfile = async ()=>{
        setSaving(true);
        const { data: { user: user_0 } } = await supabase.auth.getUser();
        if (!user_0) return;
        let emailChanged = false;
        if (profileData.email !== user_0.email) {
            const { error: emailError } = await supabase.auth.updateUser({
                email: profileData.email
            });
            if (emailError) {
                alert('Error updating email: ' + emailError.message);
            } else {
                emailChanged = true;
            }
        }
        const { error: profileError } = await supabase.from('profiles').update({
            full_name: profileData.full_name,
            phone: profileData.phone
        }).eq('user_id', user_0.id);
        if (profileError) alert('Error updating profile: ' + profileError.message);
        else {
            alert(emailChanged ? 'Profile updated! Check your email to confirm the address change.' : 'Profile updated!');
        }
        setSaving(false);
    };
    // --- Targets Handlers ---
    const handleUpdateTarget = (id, field, value)=>{
        setTargets((prev_0)=>prev_0.map((t)=>t.id === id ? {
                    ...t,
                    [field]: value
                } : t));
    };
    const handleSaveTarget = async (id_0)=>{
        const target = targets.find((t_0)=>t_0.id === id_0);
        if (!target) return;
        setSaving(true);
        const { error } = await supabase.from('notification_targets').update({
            target_name: target.target_name,
            type: target.type,
            destination_value: target.destination_value,
            message: target.message,
            enabled: target.enabled
        }).eq('id', id_0);
        if (error) alert(error.message);
        else alert('Target saved!');
        setSaving(false);
    };
    const handleDeleteTarget = async (id_1)=>{
        if (!confirm('PROTOCOL ECHO: Delete contact data?')) return;
        const { error: error_0 } = await supabase.from('notification_targets').delete().eq('id', id_1);
        if (!error_0) {
            setTargets((prev_1)=>prev_1.filter((t_1)=>t_1.id !== id_1));
        }
    };
    const handleAddTarget = async ()=>{
        if (targets.length >= 3) {
            alert('MAXIMUM TARGETS REACHED (3)');
            return;
        }
        const { data: { user: user_1 } } = await supabase.auth.getUser();
        if (!user_1) return;
        const { data, error: error_1 } = await supabase.from('notification_targets').insert({
            user_id: user_1.id,
            type: 'whatsapp',
            target_name: 'NEW CONTACT',
            destination_value: '',
            message: 'SYSTEM WARNING: Only 10 minutes remaining. Reset requested immediately.'
        }).select().single();
        if (!error_1 && data) {
            setTargets([
                ...targets,
                data
            ]);
        }
    };
    const handleTestEmail = async (email, targetId)=>{
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address first.');
            return;
        }
        setTestLoading((prev_2)=>({
                ...prev_2,
                [targetId]: true
            }));
        try {
            const res = await fetch('/api/test-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });
            if (!res.ok) {
                const text = await res.text();
                let errorMsg = text;
                try {
                    const parsed = JSON.parse(text);
                    errorMsg = parsed.error || text;
                } catch (e) {
                // fallback to text if not valid json
                }
                throw new Error(errorMsg);
            }
            const data_0 = await res.json();
            if (data_0.error) throw new Error(data_0.error);
            alert('Test email sent successfully! Please check your inbox.');
        } catch (err) {
            alert('Failed to send test email: ' + err.message);
        } finally{
            setTestLoading((prev)=>({
                    ...prev,
                    [targetId]: false
                }));
        }
    };
    // --- Security Handlers ---
    const handleSavePassword = async ()=>{
        if (passwordData.new !== passwordData.confirm) {
            alert("Passwords do not match!");
            return;
        }
        if (passwordData.new.length < 6) {
            alert("Password too short!");
            return;
        }
        setSavingPassword(true);
        const { error: error_2 } = await supabase.auth.updateUser({
            password: passwordData.new
        });
        if (error_2) alert(error_2.message);
        else {
            alert('Password updated successfully!');
            setPasswordData({
                new: '',
                confirm: ''
            });
        }
        setSavingPassword(false);
    };
    const handleEnable2FA = async ()=>{
        setMfaState((prev_3)=>({
                ...prev_3,
                loading: true
            }));
        // Clean up any dangling unverified factors first
        const { data: listData } = await supabase.auth.mfa.listFactors();
        if (listData?.totp) {
            const unverified = listData.totp.filter((f_0)=>f_0.status === 'unverified');
            for (const f_1 of unverified){
                await supabase.auth.mfa.unenroll({
                    factorId: f_1.id
                });
            }
        }
        const { data: data_1, error: error_3 } = await supabase.auth.mfa.enroll({
            factorType: 'totp',
            issuer: 'Dead Mans Switch',
            friendlyName: 'Device ' + new Date().getTime()
        });
        if (error_3) {
            alert(error_3.message);
            setMfaState((prev_4)=>({
                    ...prev_4,
                    loading: false
                }));
            return;
        }
        setMfaState((prev_5)=>({
                ...prev_5,
                factorId: data_1.id,
                qrCode: data_1.totp.qr_code,
                loading: false
            }));
    };
    const handleVerify2FA = async ()=>{
        setMfaState((prev_6)=>({
                ...prev_6,
                loading: true
            }));
        const challenge = await supabase.auth.mfa.challenge({
            factorId: mfaState.factorId
        });
        if (challenge.error) {
            alert(challenge.error.message);
            setMfaState((prev_7)=>({
                    ...prev_7,
                    loading: false
                }));
            return;
        }
        const { error: error_4 } = await supabase.auth.mfa.verify({
            factorId: mfaState.factorId,
            challengeId: challenge.data.id,
            code: mfaState.verifyCode
        });
        if (error_4) {
            alert(error_4.message);
        } else {
            alert('2FA Enabled Successfully!');
            setMfaState((prev_8)=>({
                    ...prev_8,
                    isEnrolled: true,
                    qrCode: ''
                }));
        }
        setMfaState((prev_9)=>({
                ...prev_9,
                loading: false
            }));
    };
    const handleDisable2FA = async ()=>{
        if (!confirm('Are you sure you want to disable 2FA?')) return;
        setMfaState((prev_10)=>({
                ...prev_10,
                loading: true
            }));
        const { error: error_5 } = await supabase.auth.mfa.unenroll({
            factorId: mfaState.factorId
        });
        if (error_5) alert(error_5.message);
        else {
            alert('2FA Disabled');
            setMfaState((prev_11)=>({
                    ...prev_11,
                    isEnrolled: false,
                    factorId: '',
                    qrCode: '',
                    verifyCode: ''
                }));
        }
        setMfaState((prev_12)=>({
                ...prev_12,
                loading: false
            }));
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black flex items-center justify-center text-[#00ff41] font-mono crt",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "animate-pulse tracking-[0.5em] text-2xl uppercase",
            children: "SYNCING TERMINAL..."
        }, void 0, false, {
            fileName: "[project]/src/app/settings/page.tsx",
            lineNumber: 356,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/settings/page.tsx",
        lineNumber: 355,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-black text-[#00ff41] font-mono p-4 md:p-8 crt",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>router.push('/dashboard'),
                className: "mb-8 flex items-center gap-2 text-xs opacity-50 hover:opacity-100 transition-opacity",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 360,
                        columnNumber: 17
                    }, this),
                    " RETURN TO DASHBOARD"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/settings/page.tsx",
                lineNumber: 359,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto space-y-12 pb-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-[#00ff41]/30 pb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-black uppercase tracking-widest flex items-center gap-4 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "text-[#00ff41]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 25
                                    }, this),
                                    " Operator Profile"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 366,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] opacity-50 uppercase tracking-[0.3em]",
                                children: "Identification & Comm Links"
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 369,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] opacity-40 block uppercase mb-1",
                                                        children: "Full Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: profileData.full_name,
                                                        onChange: (e_0)=>setProfileData((p)=>({
                                                                    ...p,
                                                                    full_name: e_0.target.value
                                                                })),
                                                        className: "w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none transition-colors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] opacity-40 block uppercase mb-1",
                                                        children: "Email Registry"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        value: profileData.email,
                                                        onChange: (e_1)=>setProfileData((p_0)=>({
                                                                    ...p_0,
                                                                    email: e_1.target.value
                                                                })),
                                                        className: "w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none transition-colors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 380,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 372,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] opacity-40 block uppercase mb-1",
                                                        children: "Primary Phone"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "tel",
                                                        value: profileData.phone,
                                                        onChange: (e_2)=>setProfileData((p_1)=>({
                                                                    ...p_1,
                                                                    phone: e_2.target.value
                                                                })),
                                                        className: "w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none transition-colors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 389,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] opacity-40 block uppercase mb-1",
                                                        children: "Registry Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 border border-[#00ff41]/20 bg-white/5 opacity-50",
                                                        children: mounted && profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '---'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 388,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 371,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSaveProfile,
                                    disabled: saving,
                                    className: "p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all flex items-center justify-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/settings/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 29
                                        }, this),
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold",
                                            children: "SAVE PROFILE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/settings/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 48
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/settings/page.tsx",
                                    lineNumber: 405,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 404,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 365,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-[#00ff41]/30 pb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-black uppercase tracking-widest flex items-center gap-4 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                        className: "text-[#00ff41]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 414,
                                        columnNumber: 25
                                    }, this),
                                    " Security Override"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 413,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] opacity-50 uppercase tracking-[0.3em]",
                                children: "Passcodes & 2FA Tokens"
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 416,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-[#00ff41]/20 p-6 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "flex items-center gap-2 font-bold text-lg mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 92
                                                    }, this),
                                                    " Update Passcode"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 421,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] opacity-40 block uppercase mb-1",
                                                        children: "New Passcode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 423,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        value: passwordData.new,
                                                        onChange: (e_3)=>setPasswordData((p_2)=>({
                                                                    ...p_2,
                                                                    new: e_3.target.value
                                                                })),
                                                        className: "w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 422,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] opacity-40 block uppercase mb-1",
                                                        children: "Confirm Passcode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        value: passwordData.confirm,
                                                        onChange: (e_4)=>setPasswordData((p_3)=>({
                                                                    ...p_3,
                                                                    confirm: e_4.target.value
                                                                })),
                                                        className: "w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 429,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSavePassword,
                                                disabled: savingPassword || !passwordData.new,
                                                className: "w-full mt-4 p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all font-bold text-[10px]",
                                                children: "UPDATE PASSCODE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 436,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-[#00ff41]/20 p-6 space-y-4 flex flex-col justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "flex items-center gap-2 font-bold text-lg mb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 444,
                                                                columnNumber: 96
                                                            }, this),
                                                            " 2FA Configuration"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs opacity-70 mb-4",
                                                        children: "Multi-factor authentication adds an extra layer of security to your terminal access."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 33
                                                    }, this),
                                                    mfaState.isEnrolled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 border border-[#00ff41]/50 bg-[#00ff41]/10 text-[#00ff41] font-bold text-center",
                                                        children: "✓ 2FA IS ACTIVE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 56
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 border border-red-900 bg-red-900/20 text-red-500 font-bold text-center",
                                                        children: "⚠ 2FA IS DISABLED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 46
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 443,
                                                columnNumber: 29
                                            }, this),
                                            !mfaState.isEnrolled && !mfaState.qrCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleEnable2FA,
                                                disabled: mfaState.loading,
                                                className: "w-full p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all font-bold text-[10px]",
                                                children: "ENROLL 2FA"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 455,
                                                columnNumber: 74
                                            }, this),
                                            !mfaState.isEnrolled && mfaState.qrCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 pt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-center uppercase",
                                                        children: "Scan with Authenticator App"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white p-2 w-48 h-48 mx-auto flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: mfaState.qrCode,
                                                            alt: "2FA QR Code",
                                                            className: "w-full h-full object-contain"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/settings/page.tsx",
                                                            lineNumber: 462,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] opacity-40 block uppercase mb-1",
                                                                children: "Verify 6-Digit Code"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 465,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: mfaState.verifyCode,
                                                                onChange: (e_5)=>setMfaState((p_4)=>({
                                                                            ...p_4,
                                                                            verifyCode: e_5.target.value
                                                                        })),
                                                                className: "w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none tracking-[0.5em] text-center",
                                                                maxLength: 6
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 466,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleVerify2FA,
                                                        disabled: mfaState.loading || mfaState.verifyCode.length !== 6,
                                                        className: "w-full p-3 bg-[#00ff41] text-black font-bold text-[10px]",
                                                        children: "VERIFY & ENABLE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 459,
                                                columnNumber: 73
                                            }, this),
                                            mfaState.isEnrolled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleDisable2FA,
                                                disabled: mfaState.loading,
                                                className: "w-full p-3 border border-red-900 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold text-[10px]",
                                                children: "DISABLE 2FA"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 476,
                                                columnNumber: 53
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 442,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 418,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 412,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-bold uppercase tracking-widest flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 488,
                                                        columnNumber: 33
                                                    }, this),
                                                    " Emergency Contacts"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 487,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] opacity-50 uppercase tracking-[0.2em]",
                                                children: "Protocol ECHO Targets (Max 3)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 490,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 486,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddTarget,
                                        disabled: targets.length >= 3,
                                        className: `text-[10px] border px-4 py-2 flex items-center gap-2 transition-colors ${targets.length >= 3 ? 'border-[#00ff41]/20 text-[#00ff41]/20 cursor-not-allowed' : 'border-[#00ff41] hover:bg-[#00ff41]/10'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 493,
                                                columnNumber: 29
                                            }, this),
                                            " NEW ENTRY"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 492,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 485,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    targets.map((target_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border border-[#00ff41]/30 p-6 bg-black/40 hover:border-[#00ff41]/60 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lg:col-span-4 space-y-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[8px] opacity-40 uppercase",
                                                                        children: "Target Name"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 502,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        value: target_0.target_name || '',
                                                                        onChange: (e_6)=>handleUpdateTarget(target_0.id, 'target_name', e_6.target.value),
                                                                        className: "w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 503,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 501,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[8px] opacity-40 uppercase",
                                                                        children: "Connection Type"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 506,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: target_0.type || 'whatsapp',
                                                                        onChange: (e_7)=>handleUpdateTarget(target_0.id, 'type', e_7.target.value),
                                                                        className: "w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none appearance-none cursor-pointer",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "whatsapp",
                                                                                children: "WhatsApp"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                                lineNumber: 508,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "email",
                                                                                children: "Email"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                                lineNumber: 509,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 507,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[8px] opacity-40 uppercase",
                                                                        children: "Destination"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 513,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                value: target_0.destination_value || '',
                                                                                onChange: (e_8)=>handleUpdateTarget(target_0.id, 'destination_value', e_8.target.value),
                                                                                className: "w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none font-mono"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                                lineNumber: 515,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            target_0.type === 'email' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleTestEmail(target_0.destination_value, target_0.id),
                                                                                disabled: testLoading[target_0.id],
                                                                                className: "px-3 border border-[#00ff41] text-[10px] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors whitespace-nowrap",
                                                                                children: testLoading[target_0.id] ? 'SENDING...' : 'VALIDATE'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                                lineNumber: 516,
                                                                                columnNumber: 79
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 512,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-4 pt-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "flex items-center gap-2 cursor-pointer group",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "checkbox",
                                                                            checked: target_0.enabled,
                                                                            onChange: (e_9)=>handleUpdateTarget(target_0.id, 'enabled', e_9.target.checked),
                                                                            className: "hidden"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/settings/page.tsx",
                                                                            lineNumber: 524,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `w-4 h-4 border ${target_0.enabled ? 'bg-[#00ff41] border-[#00ff41]' : 'border-[#00ff41]/30'} flex items-center justify-center`,
                                                                            children: target_0.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "w-2 h-2 bg-black"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                                lineNumber: 526,
                                                                                columnNumber: 74
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/settings/page.tsx",
                                                                            lineNumber: 525,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] uppercase opacity-70 group-hover:opacity-100",
                                                                            children: "Active"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/settings/page.tsx",
                                                                            lineNumber: 528,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/settings/page.tsx",
                                                                    lineNumber: 523,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 522,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lg:col-span-6 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[8px] opacity-40 uppercase",
                                                                children: "Custom Message"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: target_0.message || '',
                                                                onChange: (e_10)=>handleUpdateTarget(target_0.id, 'message', e_10.target.value),
                                                                className: "w-full h-32 bg-black/50 border border-[#00ff41]/20 p-3 text-xs font-mono resize-none focus:border-[#00ff41]/50 focus:outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lg:col-span-2 flex lg:flex-col justify-end lg:justify-center gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleSaveTarget(target_0.id),
                                                                disabled: saving,
                                                                className: "p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all flex items-center justify-center gap-2 lg:w-full",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 540,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-bold",
                                                                        children: "SAVE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 540,
                                                                        columnNumber: 64
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 539,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleDeleteTarget(target_0.id),
                                                                className: "p-3 border border-red-900 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 lg:w-full",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 543,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-bold",
                                                                        children: "DROP"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                                        lineNumber: 543,
                                                                        columnNumber: 66
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/settings/page.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/settings/page.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/settings/page.tsx",
                                                lineNumber: 499,
                                                columnNumber: 33
                                            }, this)
                                        }, target_0.id, false, {
                                            fileName: "[project]/src/app/settings/page.tsx",
                                            lineNumber: 498,
                                            columnNumber: 50
                                        }, this)),
                                    targets.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-12 border border-dashed border-[#00ff41]/20 opacity-30",
                                        children: "NO EMERGENCY TARGETS REGISTERED"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 50
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 497,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 484,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/settings/page.tsx",
                lineNumber: 363,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/settings/page.tsx",
        lineNumber: 358,
        columnNumber: 10
    }, this);
}
_s(SettingsPage, "0g/iRWCTrVm45xFhDMzbgET8vic=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SettingsPage;
var _c;
__turbopack_context__.k.register(_c, "SettingsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_ab3d3165._.js.map