import $ from 'jquery';

const NAME_REGEX = /^[a-zA-Zа-яёА-ЯЁ][a-zA-Zа-яёА-ЯЁ\s\-]{0,59}$/;
type FieldStateType = 'idle' | 'error' | 'ok';

function setFieldState(
  $input: JQuery<HTMLElement>,
  state: FieldStateType,
  message = '',
): void {
  const $error = $input.closest('.field__control').find('.field__error');

  $input
    .removeClass('field__input--error field__input--ok')
    .toggleClass('field__input--error', state === 'error')
    .toggleClass('field__input--ok', state === 'ok');

  $error.text(message);
}

function validateName($input: JQuery<HTMLElement>): boolean {
  const value = ($input.val() as string).trim();

  if (!value) {
    setFieldState($input, 'error', 'Введите имя');
    return false;
  }

  if (!NAME_REGEX.test(value)) {
    setFieldState($input, 'error', 'Только буквы, пробел и дефис');
    return false;
  }

  setFieldState($input, 'ok');
  return true;
}

export function initForm(): void {
  const $form = $('#form') as JQuery<HTMLFormElement>;
  const $name = $form.find<HTMLElement>('#user-name');

  let timer: ReturnType<typeof setTimeout>;
  $name.on('input', () => {
    clearTimeout(timer);
    if (!($name.val() as string).trim()) {
      setFieldState($name, 'idle');
      return;
    }
    timer = setTimeout(() => validateName($name), 400);
  });

  $name.on('blur', () => {
    if (($name.val() as string).trim()) validateName($name);
  });

  $form.on('submit', e => {
    e.preventDefault();
    const valid = validateName($name);
    if (valid) {
      const $btn = $form.find('[type=submit]');
      const originalText = $btn.text();
      $btn.text('Отправлено').prop('disabled', true);
      setTimeout(() => {
        $form[0].reset();
        setFieldState($name, 'idle');
        $btn.text(originalText).prop('disabled', false);
      }, 2500);
    }
  });
}
