export const deleteMaskCpf = (cpf: string) => {
    return cpf.split(/[.-]/).join("");
}