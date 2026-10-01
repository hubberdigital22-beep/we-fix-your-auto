export const icons = {
	globe:
		'<path d="M7.75 18.36 4 19.9l.64-4.65A8.5 8.5 0 1 1 7.75 18.36z"/><ellipse class="ic-meridian" cx="12" cy="11" rx="3.6" ry="8.5"/><path class="ic-a" d="M3.5 11h17"/>',
	caret: '<path d="m7 10 5 5 5-5"/>',
	check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
	tick: '<path class="ic-track" d="M5 12.5l4.5 4.5L19 7.5"/><path class="ic-tick" pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/>',
	arrow: '<path d="M6 18 18 6M8 6h10v10"/>',
	back: '<path d="M19 12H5M11 5l-7 7 7 7"/>',
	stopwatch:
		'<path class="ic-crown" d="M10 2.75h4M12 2.75V6"/><path d="m18 7.6 1.4-1.4"/><circle cx="12" cy="13.6" r="7.6"/><path class="ic-a ic-arc" pathLength="1" d="M12 8a5.6 5.6 0 0 1 4.85 2.8"/><path class="ic-hand" d="M12 13.6V9.6"/><circle cx="12" cy="13.6" r="1.1" fill="currentColor" stroke="none"/>',
	snapshot:
		'<rect x="6" y="2.5" width="12" height="19" rx="2.75"/><path d="M10.75 5.1h2.5M11 19h2"/><rect class="ic-shot" x="7.6" y="4" width="8.8" height="16" rx="1.5" fill="currentColor" stroke="none"/><path class="ic-a ic-frame" d="M8.75 10.6V9.25h1.35M13.9 9.25h1.35v1.35M15.25 14.4v1.35H13.9M10.1 15.75H8.75V14.4"/><path class="ic-check" pathLength="1" d="m10.3 12.6 1.2 1.2 2.3-2.5"/>',
	claim:
		'<path d="M13.5 3H7.25A1.75 1.75 0 0 0 5.5 4.75v14.5c0 .97.78 1.75 1.75 1.75H12"/><path d="M13.5 3 18.5 8v4"/><path d="M13.5 3v3.5c0 .83.67 1.5 1.5 1.5h3.5"/><path class="ic-ln" pathLength="1" d="M8.5 9h2.5"/><path class="ic-ln" pathLength="1" d="M8.5 12h6"/><path class="ic-ln" pathLength="1" d="M8.5 15h3"/><g class="ic-a ic-seal"><circle cx="16.75" cy="16.5" r="3.25"/><path d="M15 19.25v3l1.75-1 1.75 1v-3"/><circle class="ic-af" cx="16.75" cy="16.5" r="1" stroke="none"/></g>',
	route:
		'<circle cx="5.5" cy="18.5" r="1.75"/><path class="ic-road" d="M8 18.5h5.25a2.6 2.6 0 0 0 0-5.2H8.75a2.6 2.6 0 0 1 0-5.2h4.5"/><g class="ic-a ic-drop"><path d="M17 13.6s-3.75-3.2-3.75-6.4a3.75 3.75 0 0 1 7.5 0c0 3.2-3.75 6.4-3.75 6.4z"/><circle cx="17" cy="7.2" r="1.3"/></g>',
	glovebox:
		'<g class="ic-slot"><g class="ic-a ic-card"><rect x="7" y="3.5" width="10" height="7.25" rx="1.4"/><path d="M9.3 6.4h3.2M9.3 8.4h5.4"/></g></g><path d="M3 13.25h18"/><path d="M4.75 13.25v4.25A2.5 2.5 0 0 0 7.25 20h9.5a2.5 2.5 0 0 0 2.5-2.5v-4.25"/><path d="M10 16.6h4"/>',
	hazard:
		'<path d="M10.6 4.35a1.6 1.6 0 0 1 2.8 0l7.35 12.75a1.6 1.6 0 0 1-1.4 2.4H4.65a1.6 1.6 0 0 1-1.4-2.4z"/><path class="ic-a ic-glow" d="M12 9.25 8.4 15.5h7.2z"/><path d="m7 19.5-1.5 2M17 19.5l1.5 2"/>',
	mail: '<path d="M15.5 5.75H5.5A2.5 2.5 0 0 0 3 8.25v8.5a2.5 2.5 0 0 0 2.5 2.5h13a2.5 2.5 0 0 0 2.5-2.5V9.2"/><path d="m3.6 7.4 7.25 5.3a1.95 1.95 0 0 0 2.3 0L17.9 9.2"/><circle class="ic-af" cx="19.5" cy="5.5" r="2.6" stroke="none"/><circle class="ic-a ic-ping" cx="19.5" cy="5.5" r="2.6"/>',
} as const;

export type IconName = keyof typeof icons;
