import styled from 'styled-components';

export const ButtonStyled = styled.button<{ color?: 'beige' | 'blue' | 'green' }>`
  font-size: 19px;
  margin-top: 1em;
  width: 100%;
  max-width: 250px;
  height: 40px;
  border: 0px;
  border-radius: 5px;
  color: ${({ color }) =>
    color === 'beige' ? 'var(--black)' : 'var(--beige)'};

  background-color: ${({ color }) => {
    if (color === 'beige') return 'var(--beige)';
    if (color === 'green') return '#28a745'; // aqui define o verde
    return 'var(--blue)'; // default azul
  }};

  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(2px);
  }

  &.button_black {
    color: var(--black);
    background-color: var(--beige);
  }
`;