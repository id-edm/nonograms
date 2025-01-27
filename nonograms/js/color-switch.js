export function createColorSwitch() {
  const label = document.createElement('label');
  const input = document.createElement('input');
  const span = document.createElement('span');

  label.classList.add('color-switch');

  input.type = 'checkbox';
  input.classList.add('color-toggle');
  label.appendChild(input);

  span.classList.add('slider');
  label.appendChild(span);

  document.addEventListener('DOMContentLoaded', () => {
    const btnTheme = document.querySelectorAll('.button');

    function toggleColorSwitched() {
      document.body.classList.toggle('dark-theme', input.checked);
      btnTheme.forEach((btn) => {
        btn.classList.toggle('button-theme', input.checked);
      });
    }

    input.addEventListener('change', toggleColorSwitched);
  });

  return label;
}
