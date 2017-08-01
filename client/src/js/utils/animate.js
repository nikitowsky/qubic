/**
 * Add className to the DOM element and remove it with delay
 * @param {HTMLElement} element
 * @param {string} className
 * @param {number} timeout
 */
const animate = (element, className, timeout) => {
  const elcl = element.classList;

  if (!elcl.contains(className)) {
    elcl.add(className);

    setTimeout(() => {
      elcl.remove(className);
    }, timeout);
  }
};

export default animate;
