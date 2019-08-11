export interface ButtonsProps {
    btnValues: string[]
    handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void; 
}