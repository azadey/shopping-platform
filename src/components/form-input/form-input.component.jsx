
import { FormInputLabel, Input, Group} from  './form-input.style';

const FormInput = ({label, ...otherProps}) => {
    return(
        <Group>
            <Input {...otherProps}></Input>
            {label && (
            <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
            )}
        </Group>
    );
}

export default FormInput;