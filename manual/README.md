# Tecnologia
Este manual é construído usando a biblioteca mkdocs do python, mas para sua manutenção basta atualizar os arquivos markdown presentes na pasta **docs**

# Instalar o mkdocs

```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

# Rodar o mkdocs
Para visualizar o manual depois de atualizar/criar algum arquivo markdown:
1- Execute: 

```sh
mkdocs serve
```
1- Acessar no navegador: http://127.0.0.1:8000/

# Build e Commit do Manual
Para atualizar o manual no repositório, é necessário realizar o seu build antes de fazer o commit.

```sh
mkdocs build
```

Com esse comando é atualizada a pasta **site** que contem as versões html e pdf do manual.
