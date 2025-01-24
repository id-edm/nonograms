export function createColorSwitch() {
  // Создаём элементы переключателя
  const label = document.createElement('label');
  const input = document.createElement('input');
  const span = document.createElement('span');

  label.classList.add('color-switch');

  input.type = 'checkbox';
  input.classList.add('color-toggle');
  label.appendChild(input);

  span.classList.add('slider');
  label.appendChild(span);

  // Находим кнопки после загрузки DOM
  document.addEventListener('DOMContentLoaded', () => {
    const btnTheme = document.querySelectorAll('.button');
    console.log(btnTheme); // Убедимся, что кнопки найдены

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
