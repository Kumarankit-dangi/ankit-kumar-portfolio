/**
 * Smoothly scroll to a section by its element id.
 * Respects the sticky navbar height via scroll-margin-top in CSS.
 */
export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
