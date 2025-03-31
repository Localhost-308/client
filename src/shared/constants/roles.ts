interface RoleType{
    acronym: string;
    description: string;
    translated: string;
}

export const ROLES: RoleType[] = [
    {acronym:'ANA', description:'Analyst', translated: 'Analista'},
    {acronym:'LEA', description:'Leader', translated: 'Lider'},
    {acronym:'SUP', description:'Supervisor', translated: 'Supervisor'},
    {acronym:'MAN', description:'Manager', translated: 'Gerente'},
    {acronym:'HEA', description:'Head', translated: 'Diretor'},
    {acronym:'DEV', description:'Developer', translated: 'Desenvolvedor'},
    {acronym:'ADMIN', description:'Administrato', translated: 'Administrador'},
]