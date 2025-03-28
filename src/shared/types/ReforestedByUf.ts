
 export interface Serie{
    name: string;
    type: string;
    stack: string;
    label: {
        show: boolean
    },
    emphasis: {
        focus: string
    },
    data: number[]
 }