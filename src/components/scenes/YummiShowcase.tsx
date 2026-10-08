import Image from "next/image";

const base = "/work/yummi/demo";

export function YummiShowcase() {
  return (
    <div className="yummi-demo relative h-full overflow-hidden bg-[#211714] text-[#fff7ef]">
      <section className="yummi-moment yummi-hero absolute inset-0 overflow-hidden bg-[#eee8dc]">
        <Image src={`${base}/hero-fur.webp`} alt="" fill sizes="72vw" className="yummi-hero-bg object-cover" priority />
        <div className="yummi-hero-lockup absolute inset-0 z-10 flex flex-col items-center justify-center">
          <Image src={`${base}/hero-logo-red.png`} alt="Yuumi Art" width={2000} height={700} className="h-auto w-[58%]" priority />
          <Image src={`${base}/hero-by-adriana.png`} alt="By Adriana, makeup studio" width={1200} height={420} className="mt-1 h-auto w-[22%]" priority />
        </div>
        <p className="yummi-hero-prompt absolute inset-x-0 bottom-[7%] z-10 text-center text-[6px] font-bold tracking-[0.4em] text-[#6f1d2a] sm:text-[8px]">SKROLUJ ZA DALJE</p>
      </section>

      <section className="yummi-moment yummi-transform absolute inset-0 overflow-hidden bg-[#201614] opacity-0">
        <p className="absolute left-[4%] top-[6%] z-20 text-[6px] font-bold tracking-[0.34em] text-[#d8bd80]/60 sm:text-[8px]">YUUMI ART / MAKEUP STUDY / 01—04</p>
        <Image src={`${base}/props/brush.svg`} alt="" width={220} height={520} className="yummi-prop-brush absolute -bottom-[15%] -left-[3%] z-10 h-[55%] w-auto -rotate-[24deg] opacity-45" />
        <Image src={`${base}/props/eyeshadow-palette.svg`} alt="" width={360} height={220} className="yummi-prop-palette absolute left-[14%] top-[10%] z-10 h-[15%] w-auto rotate-[10deg] opacity-35" />
        <div className="yummi-transform-frame absolute right-[4%] top-[7%] h-[86%] w-[70%] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.42)]">
          {[
            ["transform-base.jpg", "Clean glam makeup"],
            ["transform-eyes.jpg", "Blue eyeshadow makeup"],
            ["transform-color.jpg", "Soft glam makeup"],
            ["transform-final.jpg", "Final editorial makeup look"],
          ].map(([src, alt], index) => (
            <Image key={src} src={`${base}/${src}`} alt={alt} fill sizes="52vw" className={`yummi-transform-image yummi-transform-image-${index} object-cover object-[50%_34%] ${index === 0 ? "opacity-100" : "opacity-0"}`} />
          ))}
          <div className="yummi-shimmer absolute inset-y-0 left-[-25%] z-10 w-[18%] bg-[linear-gradient(100deg,transparent,rgba(255,248,239,0.18),transparent)] opacity-0" />
        </div>
        <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(22,15,12,0.85),rgba(22,15,12,0.06)_56%,rgba(22,15,12,0.1))]" />
        {[
          ["01", "TEN"], ["02", "OČI"], ["03", "BOJA"], ["04", "FINALNI LOOK"],
        ].map(([number, title], index) => (
          <div key={number} className={`yummi-stage-copy yummi-stage-copy-${index} absolute bottom-[9%] left-[5%] z-30 opacity-0`}>
            <p className="text-[7px] font-bold tracking-[0.4em] text-[#d2af76] sm:text-[9px]">{number}</p>
            <p className="mt-1 font-serif text-[clamp(1.5rem,5vw,4.5rem)] leading-[0.82]">{title}</p>
          </div>
        ))}
      </section>

      <section className="yummi-moment yummi-details absolute inset-0 overflow-hidden bg-[#211714] opacity-0">
        <div className="absolute inset-0 font-serif text-[clamp(2rem,10vw,8rem)] leading-[0.78] text-[#fff7ef]/25">
          <span className="yummi-detail-word-1 absolute left-[5%] top-[12%]">BEAUTY</span>
          <span className="yummi-detail-word-2 absolute right-[5%] top-[39%]">IS IN</span>
          <span className="yummi-detail-word-3 absolute bottom-[10%] left-[17%]">THE DETAILS.</span>
        </div>
        <div className="yummi-detail-a absolute left-[5%] top-[14%] h-[38%] w-[42%] overflow-hidden [clip-path:inset(0_100%_0_0)]">
          <Image src={`${base}/detail-lips.jpg`} alt="Yuumi Art editorial makeup detail" fill sizes="32vw" className="yummi-detail-image object-cover object-[52%_32%]" />
        </div>
        <div className="yummi-detail-b absolute right-[7%] top-[6%] h-[64%] w-[28%] overflow-hidden opacity-0 [clip-path:polygon(0_0,100%_0,100%_0,0_0)]">
          <Image src={`${base}/detail-eyes.jpg`} alt="Yuumi Art eye makeup detail" fill sizes="24vw" className="yummi-detail-image object-cover object-[50%_38%]" />
        </div>
        <div className="yummi-detail-c absolute bottom-[7%] left-[32%] h-[42%] w-[34%] overflow-hidden opacity-0 [clip-path:circle(0%_at_50%_50%)]">
          <Image src={`${base}/detail-texture.jpg`} alt="Yuumi Art beauty texture detail" fill sizes="28vw" className="yummi-detail-image object-cover object-[50%_31%]" />
        </div>
        <p className="yummi-detail-front absolute left-[9%] top-[43%] z-20 font-serif text-[clamp(2rem,8vw,7rem)] leading-none opacity-0 mix-blend-difference">DETAILS.</p>
      </section>

      <section className="yummi-moment yummi-booking absolute inset-0 overflow-hidden bg-[#1b1110] opacity-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(244,226,198,0.16),transparent_34%)]" />
        <p className="yummi-ready-top absolute inset-x-0 top-[16%] text-center font-serif text-[clamp(1.8rem,8vw,7rem)] leading-none text-[#fff7ef]/80">SPREMNA ZA</p>
        <p className="yummi-ready-bottom absolute inset-x-0 bottom-[15%] text-center font-serif text-[clamp(1.8rem,8vw,7rem)] italic leading-none text-[#fff7ef]/80">SVOJ LOOK?</p>
        <Image src={`${base}/props/lipstick.svg`} alt="" width={180} height={360} className="absolute -right-[2%] bottom-[8%] h-[28%] w-auto rotate-[22deg] opacity-25" />
        <Image src={`${base}/props/eyelash-curler.svg`} alt="" width={280} height={360} className="absolute -left-[2%] top-[13%] h-[28%] w-auto -rotate-[14deg] opacity-20" />
        <div className="yummi-mirror absolute left-1/2 top-1/2 h-[76%] w-[34%] min-w-28 -translate-x-1/2 -translate-y-1/2 scale-[0.82] overflow-hidden rounded-[48%_48%_42%_42%] border-[5px] border-[#c5a56d]/75 bg-[#ead8c2] opacity-70 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <div className="yummi-reflection absolute inset-0 scale-110 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.72),transparent_20%),linear-gradient(135deg,#fff8ef,#c7a982_68%,#f8efe4)] opacity-0" />
          <div className="yummi-booking-panel relative z-10 grid h-full place-items-center p-3 text-center text-[#6f1d2a] opacity-0">
            <div>
              <p className="font-serif text-[clamp(1.35rem,4.4vw,3.8rem)] leading-[0.82]">ZAKAŽI<br />SVOJ<br />TERMIN</p>
              <p className="mt-3 text-[5px] font-bold tracking-[0.2em] sm:text-[7px]">IZABERI USLUGU I POŠALJI ZAHTEV →</p>
            </div>
          </div>
          <div className="yummi-mirror-shine absolute inset-y-0 left-[-55%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
        </div>
        <div className="yummi-lipstick-line absolute bottom-[17%] left-1/2 h-1.5 w-[44%] origin-left -translate-x-1/2 scale-x-0 -rotate-2 rounded-full bg-[#7d1f2d]" />
      </section>

      <div className="yummi-static-strip absolute inset-0 hidden grid-cols-3 gap-1 bg-[#1b1110] p-1">
        {["transform-final.jpg", "detail-eyes.jpg", "detail-texture.jpg"].map((src) => (
          <div className="relative overflow-hidden" key={src}><Image src={`${base}/${src}`} alt="" fill sizes="24vw" className="object-cover" /></div>
        ))}
      </div>
    </div>
  );
}
