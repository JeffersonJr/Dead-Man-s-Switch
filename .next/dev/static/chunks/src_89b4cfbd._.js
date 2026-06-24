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
"[project]/src/lib/sounds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "playSound",
    ()=>playSound
]);
'use client';
const playSound = (type)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const soundMap = {
        beep: '/sounds/beep.wav',
        reset: '/sounds/reset.wav',
        alarm: '/sounds/alarm.wav',
        fail: '/sounds/fail.wav'
    };
    const audio = new Audio(soundMap[type]);
    audio.volume = 0.5;
    if (type === 'alarm') {
        audio.loop = true;
    }
    audio.play().catch((e)=>console.warn('Audio playback failed (interaction required):', e));
    return audio // Return for alarm control
    ;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ResetButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResetButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sounds.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ResetButton({ onReset, isCritical }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sequence, setSequence] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const handleReset = async ()=>{
        if (sequence.trim() !== '4 8 15 16 23 42') {
            alert('INVALID SEQUENCE: ACCESS DENIED');
            return;
        }
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            // Update counter_status (only updating last_reset_at because deadline_at and email_enviado don't exist in the current schema)
            const { error: counterError } = await supabase.from('counter_status').update({
                last_reset_at: new Date().toISOString()
            }).eq('user_id', user.id);
            if (counterError) {
                console.error('Supabase update error:', counterError);
                throw new Error(counterError.message || 'Failed to update counter_status');
            }
            // Log the reset
            await supabase.from('logs').insert({
                user_id: user.id,
                user_agent: navigator.userAgent
            });
            setSequence('');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playSound"])('reset');
            onReset();
        } catch (error) {
            console.error('Reset failed:', error);
            alert(`CRITICAL SYSTEM ERROR: RESET FAILED - ${error?.message || JSON.stringify(error)}`);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResetButton.useEffect": ()=>{
            const handleKeyDown = {
                "ResetButton.useEffect.handleKeyDown": (e)=>{
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                        e.preventDefault();
                        handleReset();
                    }
                }
            }["ResetButton.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "ResetButton.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["ResetButton.useEffect"];
        }
    }["ResetButton.useEffect"], [
        sequence,
        supabase,
        onReset
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: `block text-[10px] uppercase tracking-[0.3em] mb-2 opacity-70 text-center ${isCritical ? 'text-red-700' : ''}`,
                        children: "Enter Execute Sequence"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResetButton.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: sequence,
                        onChange: (e_0)=>{
                            setSequence(e_0.target.value);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playSound"])('beep');
                        },
                        placeholder: "X X X X X X",
                        className: `w-full bg-black border-b-2 ${isCritical ? 'border-red-600 text-red-600' : 'border-[#00ff41] text-[#00ff41]'} p-2 text-center text-2xl font-black tracking-widest focus:outline-none focus:border-opacity-100 border-opacity-30 uppercase placeholder:opacity-20 transition-colors duration-500`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResetButton.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResetButton.tsx",
                lineNumber: 69,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleReset,
                disabled: loading,
                className: `
          relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-8 ${isCritical ? 'border-red-600 shadow-[0_0_30px_rgba(255,0,0,0.5)]' : 'border-[#00ff41]'} 
          flex flex-col items-center justify-center gap-2
          transition-all duration-300 active:scale-95
          ${loading ? 'animate-pulse opacity-50' : isCritical ? 'hover:bg-red-950/40' : 'hover:bg-[rgba(0,255,65,0.1)] hover:shadow-[0_0_50px_rgba(0,255,65,0.4)]'}
        `,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute inset-0 bg-transparent border-2 ${isCritical ? 'border-red-600' : 'border-[#00ff41]'} rounded-full scale-110 opacity-20`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResetButton.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-lg sm:text-xl font-black tracking-[0.2em] ${isCritical ? 'text-red-600' : ''}`,
                        children: "EXECUTE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResetButton.tsx",
                        lineNumber: 84,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[8px] opacity-40 absolute bottom-8 uppercase tracking-widest font-bold",
                        children: "⌘ + Enter"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResetButton.tsx",
                        lineNumber: 85,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResetButton.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-[#00ff41] animate-pulse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResetButton.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs uppercase tracking-widest",
                        children: "Execute reset sequence before terminal time"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResetButton.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResetButton.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ResetButton.tsx",
        lineNumber: 68,
        columnNumber: 10
    }, this);
}
_s(ResetButton, "IKv7/XJbQxcc0YRfZySNBRXZny4=");
_c = ResetButton;
var _c;
__turbopack_context__.k.register(_c, "ResetButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResetButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResetButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addHours$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addHours.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sounds.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const dynamic = 'force-dynamic';
;
;
;
;
;
;
;
function DashboardPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(87);
    if ($[0] !== "5433cecd57eb67a3d3536b87c0cd1351cbd70575e3873560072ddc44a21726b8") {
        for(let $i = 0; $i < 87; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5433cecd57eb67a3d3536b87c0cd1351cbd70575e3873560072ddc44a21726b8";
    }
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const supabase = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t1;
    if ($[2] !== router) {
        t1 = ({
            "DashboardPage[fetchStatus]": async ()=>{
                const { data: t2 } = await supabase.auth.getUser();
                const { user } = t2;
                if (!user) {
                    router.push("/login");
                    return;
                }
                const { data, error } = await supabase.from("counter_status").select("*").eq("user_id", user.id).single();
                if (error) {
                    console.error(error);
                } else {
                    setStatus(data);
                    const { data: profile } = await supabase.from("profiles").select("onboarding_completed").eq("user_id", user.id).single();
                    if (profile && !profile.onboarding_completed) {
                        router.push("/onboarding");
                    }
                }
                setLoading(false);
            }
        })["DashboardPage[fetchStatus]"];
        $[2] = router;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const fetchStatus = t1;
    let t2;
    let t3;
    if ($[4] !== fetchStatus) {
        t2 = ({
            "DashboardPage[useEffect()]": ()=>{
                setMounted(true);
                fetchStatus();
            }
        })["DashboardPage[useEffect()]"];
        t3 = [
            fetchStatus
        ];
        $[4] = fetchStatus;
        $[5] = t2;
        $[6] = t3;
    } else {
        t2 = $[5];
        t3 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    const warnTriggered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [alarmAudio, setAlarmAudio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t4;
    if ($[7] !== alarmAudio || $[8] !== status || $[9] !== warnTriggered) {
        t4 = ({
            "DashboardPage[useEffect()]": ()=>{
                if (!status?.last_reset_at) {
                    return;
                }
                const timer = setInterval({
                    "DashboardPage[useEffect() > setInterval()]": ()=>{
                        const nextReset = status.deadline_at ? new Date(status.deadline_at) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addHours$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addHours"])(new Date(status.last_reset_at), 24);
                        const now = new Date();
                        const diff = nextReset.getTime() - now.getTime();
                        const secondsLeft = Math.floor(diff / 1000);
                        const isHieroglyphs = secondsLeft <= 60 && secondsLeft > 0;
                        if (isHieroglyphs && !alarmAudio) {
                            const audio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playSound"])("alarm");
                            if (audio) {
                                setAlarmAudio(audio);
                            }
                        } else {
                            if ((secondsLeft > 60 || secondsLeft <= 0) && alarmAudio) {
                                alarmAudio.pause();
                                setAlarmAudio(null);
                            }
                        }
                        if (secondsLeft > 0) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playSound"])("beep");
                        }
                        if (secondsLeft === 600 && !warnTriggered[0]) {
                            warnTriggered[1](true);
                            supabase.functions.invoke("warn-user", {
                                body: {
                                    userId: status.user_id,
                                    minutesLeft: 10
                                }
                            });
                        }
                        if (diff <= 0) {
                            setTimeLeft("SYSTEM OVERRIDE REQUIRED");
                        } else {
                            const hours = Math.floor(diff / 3600000);
                            const minutes = Math.floor(diff % 3600000 / 60000);
                            const seconds = Math.floor(diff % 60000 / 1000);
                            setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
                        }
                    }
                }["DashboardPage[useEffect() > setInterval()]"], 1000);
                return ()=>clearInterval(timer);
            }
        })["DashboardPage[useEffect()]"];
        $[7] = alarmAudio;
        $[8] = status;
        $[9] = warnTriggered;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] !== status) {
        t5 = [
            status
        ];
        $[11] = status;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[13] !== router) {
        t6 = ({
            "DashboardPage[handleLogout]": async ()=>{
                await supabase.auth.signOut();
                router.push("/login");
            }
        })["DashboardPage[handleLogout]"];
        $[13] = router;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    const handleLogout = t6;
    if (loading) {
        let t7;
        if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-black flex items-center justify-center text-[#00ff41] font-mono crt",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "animate-pulse tracking-[0.5em] text-2xl uppercase",
                    children: "SYSTEM INITIALIZING..."
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 174,
                    columnNumber: 113
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 174,
                columnNumber: 12
            }, this);
            $[15] = t7;
        } else {
            t7 = $[15];
        }
        return t7;
    }
    let t7;
    if ($[16] !== status) {
        t7 = status?.deadline_at ? Math.floor((new Date(status.deadline_at).getTime() - new Date().getTime()) / 1000) : status?.last_reset_at ? Math.floor(((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addHours$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addHours"])(new Date(status.last_reset_at), 24).getTime() - new Date().getTime()) / 1000) : 100000;
        $[16] = status;
        $[17] = t7;
    } else {
        t7 = $[17];
    }
    const secondsLeft_0 = t7;
    const isCritical = secondsLeft_0 <= 60 && secondsLeft_0 > 0;
    const t8 = `min-h-screen bg-black ${isCritical ? "text-red-600" : "text-[#00ff41]"} font-mono p-4 md:p-8 relative crt`;
    const t9 = `w-full h-full grayscale ${isCritical ? "sepia invert" : "invert"}`;
    let t10;
    if ($[18] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/logo.png",
                alt: "Dharma",
                className: t9
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 195,
                columnNumber: 161
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 195,
            columnNumber: 11
        }, this);
        $[18] = t9;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    const t11 = `flex flex-col sm:flex-row justify-between items-center mb-12 border-b ${isCritical ? "border-red-600" : "border-[#00ff41]"} pb-4 gap-4 relative z-10`;
    const t12 = `w-10 h-10 sm:w-12 sm:h-12 grayscale ${isCritical ? "sepia invert" : "invert"}`;
    let t13;
    if ($[20] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: "/logo.png",
            alt: "Swan",
            className: t12
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[20] = t12;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    let t14;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-lg sm:text-xl font-bold tracking-tighter uppercase",
                    children: "Dharma Initiative"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 213,
                    columnNumber: 16
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[8px] sm:text-[10px] opacity-70 uppercase tracking-widest leading-none",
                    children: "The Swan Station / Operator Console"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 213,
                    columnNumber: 110
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 213,
            columnNumber: 11
        }, this);
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] !== t13) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 sm:gap-4",
            children: [
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 220,
            columnNumber: 11
        }, this);
        $[23] = t13;
        $[24] = t15;
    } else {
        t15 = $[24];
    }
    let t16;
    if ($[25] !== router) {
        t16 = ({
            "DashboardPage[<button>.onClick]": ()=>router.push("/settings")
        })["DashboardPage[<button>.onClick]"];
        $[25] = router;
        $[26] = t16;
    } else {
        t16 = $[26];
    }
    const t17 = `flex items-center gap-2 hover:bg-[#00ff41] hover:text-black px-4 py-2 border transition-colors text-[10px] sm:text-xs w-full sm:w-auto justify-center ${isCritical ? "border-red-600 hover:bg-red-600" : "border-[#00ff41]"}`;
    let t18;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 239,
            columnNumber: 11
        }, this);
        $[27] = t18;
    } else {
        t18 = $[27];
    }
    let t19;
    if ($[28] !== t16 || $[29] !== t17) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t16,
            className: t17,
            children: [
                t18,
                " CONFIG"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 246,
            columnNumber: 11
        }, this);
        $[28] = t16;
        $[29] = t17;
        $[30] = t19;
    } else {
        t19 = $[30];
    }
    const t20 = `flex items-center gap-2 hover:bg-[#00ff41] hover:text-black px-4 py-2 border transition-colors text-[10px] sm:text-xs w-full sm:w-auto justify-center ${isCritical ? "border-red-600 hover:bg-red-600" : "border-[#00ff41]"}`;
    let t21;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[31] = t21;
    } else {
        t21 = $[31];
    }
    let t22;
    if ($[32] !== handleLogout || $[33] !== t20) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleLogout,
            className: t20,
            children: [
                t21,
                " TERMINATE"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 263,
            columnNumber: 11
        }, this);
        $[32] = handleLogout;
        $[33] = t20;
        $[34] = t22;
    } else {
        t22 = $[34];
    }
    let t23;
    if ($[35] !== t19 || $[36] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                t19,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 272,
            columnNumber: 11
        }, this);
        $[35] = t19;
        $[36] = t22;
        $[37] = t23;
    } else {
        t23 = $[37];
    }
    let t24;
    if ($[38] !== t11 || $[39] !== t15 || $[40] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t11,
            children: [
                t15,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 281,
            columnNumber: 11
        }, this);
        $[38] = t11;
        $[39] = t15;
        $[40] = t23;
        $[41] = t24;
    } else {
        t24 = $[41];
    }
    const t25 = `lg:col-span-2 ${isCritical ? "border-red-600 border-4 bg-red-950/20 shadow-[0_0_50px_rgba(255,0,0,0.3)]" : "border-[#00ff41]"} border p-4 sm:p-8 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] shadow-[inset_0_0_20px_rgba(0,255,65,0.1)] transition-colors duration-500`;
    const t26 = isCritical ? "CRITICAL SYSTEM FAILURE IMMINENT" : "Countdown to Failure";
    let t27;
    if ($[42] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4 sm:mb-6 opacity-70",
            children: t26
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 293,
            columnNumber: 11
        }, this);
        $[42] = t26;
        $[43] = t27;
    } else {
        t27 = $[43];
    }
    const t28 = `text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black ${isCritical ? "error-glow-text font-serif italic" : "glow-text"} tabular-nums break-all`;
    const t29 = isCritical ? "\uD80C\uDC10\uD80C\uDC11\uD80C\uDC12\uD80C\uDC13\uD80C\uDC14" : timeLeft || "00:00:00";
    let t30;
    if ($[44] !== t28 || $[45] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t28,
            children: t29
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 303,
            columnNumber: 11
        }, this);
        $[44] = t28;
        $[45] = t29;
        $[46] = t30;
    } else {
        t30 = $[46];
    }
    let t31;
    if ($[47] !== isCritical) {
        t31 = isCritical && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 animate-bounce text-lg sm:text-2xl font-black",
            children: "SYSTEM OVERRIDE REQUIRED"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 312,
            columnNumber: 25
        }, this);
        $[47] = isCritical;
        $[48] = t31;
    } else {
        t31 = $[48];
    }
    let t32;
    if ($[49] !== t27 || $[50] !== t30 || $[51] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-12 text-center w-full px-2",
            children: [
                t27,
                t30,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 320,
            columnNumber: 11
        }, this);
        $[49] = t27;
        $[50] = t30;
        $[51] = t31;
        $[52] = t32;
    } else {
        t32 = $[52];
    }
    let t33;
    if ($[53] !== fetchStatus || $[54] !== isCritical) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResetButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onReset: fetchStatus,
            isCritical: isCritical
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 330,
            columnNumber: 11
        }, this);
        $[53] = fetchStatus;
        $[54] = isCritical;
        $[55] = t33;
    } else {
        t33 = $[55];
    }
    let t34;
    if ($[56] !== t25 || $[57] !== t32 || $[58] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t25,
            children: [
                t32,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 339,
            columnNumber: 11
        }, this);
        $[56] = t25;
        $[57] = t32;
        $[58] = t33;
        $[59] = t34;
    } else {
        t34 = $[59];
    }
    const t35 = `${isCritical ? "border-red-600" : "border-[#00ff41]"} border p-6 space-y-4`;
    const t36 = `flex items-center gap-2 text-sm font-bold border-b ${isCritical ? "border-red-600" : "border-[#00ff41]"} pb-2`;
    let t37;
    if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 351,
            columnNumber: 11
        }, this);
        $[60] = t37;
    } else {
        t37 = $[60];
    }
    let t38;
    if ($[61] !== t36) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: t36,
            children: [
                t37,
                " SYSTEM STATUS"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[61] = t36;
        $[62] = t38;
    } else {
        t38 = $[62];
    }
    let t39;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "opacity-70 uppercase text-[10px]",
                    children: "Registry:"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 366,
                    columnNumber: 49
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-bold",
                    children: "ACTIVE"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 366,
                    columnNumber: 116
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 366,
            columnNumber: 11
        }, this);
        $[63] = t39;
    } else {
        t39 = $[63];
    }
    let t40;
    if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "opacity-70 uppercase text-[10px]",
                    children: "Service:"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 373,
                    columnNumber: 49
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-bold",
                    children: "MONITORING"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 373,
                    columnNumber: 115
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 373,
            columnNumber: 11
        }, this);
        $[64] = t40;
    } else {
        t40 = $[64];
    }
    let t41;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2 text-xs",
            children: [
                t39,
                t40,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "opacity-70 uppercase text-[10px]",
                            children: "Interval:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 380,
                            columnNumber: 94
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold uppercase",
                            children: "24 HOURS"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 380,
                            columnNumber: 161
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 380,
                    columnNumber: 56
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 380,
            columnNumber: 11
        }, this);
        $[65] = t41;
    } else {
        t41 = $[65];
    }
    let t42;
    if ($[66] !== t35 || $[67] !== t38) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t35,
            children: [
                t38,
                t41
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 387,
            columnNumber: 11
        }, this);
        $[66] = t35;
        $[67] = t38;
        $[68] = t42;
    } else {
        t42 = $[68];
    }
    let t43;
    if ($[69] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "flex items-center gap-2 text-sm font-bold border-b border-[#00ff41] pb-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 396,
                    columnNumber: 100
                }, this),
                " LAST VERIFICATION"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 396,
            columnNumber: 11
        }, this);
        $[69] = t43;
    } else {
        t43 = $[69];
    }
    let t44;
    if ($[70] !== mounted || $[71] !== status) {
        t44 = mounted && status?.last_reset_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(status.last_reset_at), {
            addSuffix: true
        }).toUpperCase() : "---";
        $[70] = mounted;
        $[71] = status;
        $[72] = t44;
    } else {
        t44 = $[72];
    }
    let t45;
    if ($[73] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border border-[#00ff41] p-6 space-y-4",
            children: [
                t43,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl font-bold",
                    children: t44
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 414,
                    columnNumber: 71
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 414,
            columnNumber: 11
        }, this);
        $[73] = t44;
        $[74] = t45;
    } else {
        t45 = $[74];
    }
    let t46;
    if ($[75] === Symbol.for("react.memo_cache_sentinel")) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border border-[#00ff41] p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] leading-relaxed opacity-60",
                children: "WARNING: SYSTEM FAILURE TO RECEIVE RESET SEQUENCE WITHIN ASSIGNED PARAMETERS WILL RESULT IN IMMEDIATE ACTIVATION OF PROTOCOL ECHO."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 422,
                columnNumber: 56
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 422,
            columnNumber: 11
        }, this);
        $[75] = t46;
    } else {
        t46 = $[75];
    }
    let t47;
    if ($[76] !== t42 || $[77] !== t45) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-8",
            children: [
                t42,
                t45,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 429,
            columnNumber: 11
        }, this);
        $[76] = t42;
        $[77] = t45;
        $[78] = t47;
    } else {
        t47 = $[78];
    }
    let t48;
    if ($[79] !== t34 || $[80] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 pb-12",
            children: [
                t34,
                t47
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 438,
            columnNumber: 11
        }, this);
        $[79] = t34;
        $[80] = t47;
        $[81] = t48;
    } else {
        t48 = $[81];
    }
    let t49;
    if ($[82] !== t10 || $[83] !== t24 || $[84] !== t48 || $[85] !== t8) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: t8,
            children: [
                t10,
                t24,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 447,
            columnNumber: 11
        }, this);
        $[82] = t10;
        $[83] = t24;
        $[84] = t48;
        $[85] = t8;
        $[86] = t49;
    } else {
        t49 = $[86];
    }
    return t49;
}
_s(DashboardPage, "Ijj+4aSNtoHprCCPA51yK2qFf3c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_89b4cfbd._.js.map