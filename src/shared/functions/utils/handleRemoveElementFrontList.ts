export const handleRemoveElementFromList = (index: number, list: any[], setList: any) => {
    const listWithoutItem = list.filter((_,i) => i !== index);
    setList(listWithoutItem);
}