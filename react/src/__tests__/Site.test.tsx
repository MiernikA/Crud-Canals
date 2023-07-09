import { describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Site from '../Site';

describe('<Site />', () => {
    const { container } = render(<Site />);
    expect(container).toBeTruthy();

    test('SITE MOUNTS PORPERLY', () => {

        const inputCanal = container.querySelector('.input-canal') as HTMLInputElement;
        const inputAmount = container.querySelector('.input-amount') as HTMLInputElement;
        const addButton = container.querySelector('.btn-add') as HTMLInputElement;
        const table = container.querySelector('.table') as HTMLInputElement;
        const chartSection = container.querySelector('.chart-section') as HTMLInputElement;

        expect(inputCanal).toBeTruthy();
        expect(inputAmount).toBeTruthy();
        expect(addButton).toBeTruthy();
        expect(table).toBeTruthy();
        expect(chartSection).toBeTruthy();
    });

    test('ADDING NEW CANAL', () => {

        const inputCanal = container.querySelector('#cnl') as HTMLInputElement;
        const inputAmount = container.querySelector('#amt') as HTMLInputElement;
        const addButton = container.querySelector('.btn-add') as HTMLInputElement;

        if (inputCanal && inputAmount && addButton) {
            fireEvent.change(inputCanal, { target: { value: 'new_canal' } });
            fireEvent.change(inputAmount, { target: { value: '10' } });

            fireEvent.click(addButton);

            expect((inputCanal as HTMLInputElement).value).toBe('');
            expect((inputAmount as HTMLInputElement).value).toBe('');

            const newCanalRow = container.querySelector('td')?.textContent;
            const newAmountCell = container.querySelector('td:nth-child(2)')?.textContent;
            expect(newCanalRow).toBe('new_canal');
            expect(newAmountCell).toBe('10');
        }
    });


    test('REMOVING A CANAL', () => {
        const removeButton = container.querySelector('.btn-remove') as HTMLInputElement;

        if (removeButton) {
            fireEvent.click(removeButton);
            expect(container.textContent).not.toContain('new_canal');
        }
    });


    test('EDITING CANAL', () => {
        const inputAmount = container.querySelector('.input-amount') as HTMLInputElement;
        const saveButton = container.querySelector('.btn-save') as HTMLInputElement;

        if (inputAmount && saveButton) {
            fireEvent.change(inputAmount, { target: { value: '20' } });
            fireEvent.click(saveButton);

            const updatedAmountCell = container.querySelector('td:nth-child(2)');
            expect(updatedAmountCell?.textContent).toBe('20');
        }
    });

});
