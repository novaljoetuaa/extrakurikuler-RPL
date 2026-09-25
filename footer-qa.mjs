export default async function run(page, ui) {
  await page.waitForTimeout(2500); // splash screen selesai
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500); // reveal animation footer

  // Cek layout shift / overflow horizontal
  const check = await page.evaluate(() => {
    const f = document.querySelector("footer");
    const bg = f ? f.children[1] : null; // layer background absolute
    return {
      footerHeight: f ? Math.round(f.getBoundingClientRect().height) : null,
      docScrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasHorizontalOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      bgExists: !!bg,
      bgPosition: bg ? getComputedStyle(bg).position : null,
      bgOpacity: bg ? getComputedStyle(bg).opacity : null,
    };
  });
  return check;
}
