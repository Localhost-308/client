import { memo, useEffect, useState } from 'react';
import { DefaultOptionType } from 'antd/es/select';
import { SelectProps as SelectPropsAntd } from 'antd/es/select/index';
import SelectAntd from 'antd/es/select/index';

import styles from '../select/Select.module.css';
import stylesInput from '../input/Input.module.css';


interface SelectProps extends SelectPropsAntd {
    title?: string;
    margin?: string; 
    label?: string;
}

const SelectFilter = ({ margin, title, label, placeholder, value, onChange, ...props }: SelectProps) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(value as string | undefined);

    useEffect(() => {
        setSelectedValue(value ? String(value) : undefined);
    }, [value]);

    const handleChange = (value: string, option: DefaultOptionType | DefaultOptionType[]) => {
        setSelectedValue(value || undefined);
        if (onChange) {
            onChange(value, option);
        }
    };

    return (
        <div className={styles.div_input} style={{ margin }}>
            {title && (<h3 className={styles.title}>{title}</h3>)}
            {label && <label className={stylesInput.label_input}>{label}</label>}
            <SelectAntd
                showSearch
                value={selectedValue}
                placeholder={placeholder || 'Selecionar'}
                onChange={handleChange} 
                filterOption={(input, option) =>
                    (option?.label?.toString().toLowerCase() ?? '').includes(input.toLowerCase())
                }
                {...props}
                style={{ width: '320px', height: '40px', fontSize: '20px' }}
            />
        </div>
    );
};

export default memo(SelectFilter);