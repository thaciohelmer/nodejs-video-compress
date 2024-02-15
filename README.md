Claro! Aqui está o README.md atualizado com as alterações sugeridas:

---

# Node.js Video Compressor

Este é um projeto Node.js para comprimir vídeos usando a biblioteca ffmpeg.

## Pré-requisitos

- Node.js instalado no seu sistema
- Yarn (gerenciador de pacotes) instalado globalmente
- ffmpeg instalado no seu sistema

## Instalação

1. Clone este repositório para o seu ambiente local usando Git:

   ```
   git clone https://github.com/seu-usuario/nodejs-video-compressor.git
   ```

2. Navegue até o diretório do projeto:

   ```
   cd nodejs-video-compressor
   ```

3. Instale as dependências do projeto usando Yarn:
   ```
   yarn install
   ```

## Como Usar

Para comprimir um vídeo, execute o seguinte comando no terminal:

```
yarn compress [caminho-do-arquivo-de-video]
```

- Se você não fornecer o caminho do arquivo de vídeo como argumento, será solicitado mais tarde durante a execução do comando.

- Durante a execução, você será solicitado a selecionar uma taxa de bits para a compressão do vídeo a partir de uma lista de opções.

- Após selecionar a taxa de bits desejada, o vídeo será comprimido e o arquivo resultante será salvo na pasta `output` dentro do diretório do projeto.

## Personalização

- Você pode ajustar as configurações de compressão, como taxa de bits de vídeo e áudio, no arquivo `compress.js` conforme suas necessidades.

- Se desejar adicionar mais opções de taxa de bits, você pode editar a matriz `availableBitrates` no arquivo `compress.js`.

## Features

- Comprima vídeos facilmente usando a linha de comando.
- Interface de linha de comando intuitiva para seleção de opções de compressão.
- Personalize as configurações de compressão de acordo com suas necessidades.
- Suporte para várias opções de taxa de bits para vídeo.
- **Em breve:** Este projeto será expandido para uma CLI (Command-Line Interface) tool para facilitar ainda mais a compressão de vídeos diretamente do terminal.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

---

Sinta-se à vontade para personalizar este README.md de acordo com as especificidades do seu projeto, adicionando mais seções, detalhes de uso, exemplos de código, etc.
