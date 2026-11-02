import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({ value, duration = 900, className = "" }) {
    const target = Number(value) || 0;
    const [display, setDisplay] = useState(0);
    const fromRef = useRef(0); // angka yang sedang tampil, jadi titik awal animasi berikutnya

    useEffect(() => {
        const from = fromRef.current;
        const startTime = performance.now();
        let frameId;

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // melambat di akhir
            const current = Math.round(from + (target - from) * eased);

            fromRef.current = current;
            setDisplay(current);

            if (progress < 1) frameId = requestAnimationFrame(tick);
        };

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId); // batalkan jika nilai berubah / komponen hilang
    }, [target, duration]);

    return <span className={className}>{display}</span>;
}