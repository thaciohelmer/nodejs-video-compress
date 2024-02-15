const ffmpegPath = require("ffmpeg-static");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const crypto = require("crypto");
const colors = require("colors");
const readline = require("readline");

// Função para obter o tamanho do arquivo em MB
const getFileSizeMB = (filePath) => {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes / (1024 * 1024);
};

// Função para gerar um hash
const generateHash = (input) => {
  return crypto.createHash("md5").update(input).digest("hex");
};

// Lista de taxas de bits disponíveis
const availableBitrates = ["500k", "1000k", "2000k"]; // Adicione outras taxas conforme necessário

// Função para exibir o menu e aguardar a entrada do usuário
function displayMenuAndPrompt(inputFile) {
  console.log("🎬 Selecione a taxa de bits para a compressão do vídeo:\n");
  availableBitrates.forEach((bitrate, index) => {
    console.log(`   ${index + 1}. ${bitrate} 🔹`);
  });

  console.log(""); // Linha em branco para espaçamento
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "👉 Digite o número correspondente à taxa desejada: ",
    (answer) => {
      const selectedOption = parseInt(answer);
      rl.close();

      if (
        isNaN(selectedOption) ||
        selectedOption < 1 ||
        selectedOption > availableBitrates.length
      ) {
        console.error(
          "\n⚠️ Opção inválida. Por favor, insira o número correspondente à taxa desejada."
        );
        displayMenuAndPrompt(inputFile);
      } else {
        const selectedBitrate = availableBitrates[selectedOption - 1];
        console.log(`\n✅ Você escolheu a taxa: ${selectedBitrate}`);
        compressVideo(selectedBitrate, inputFile);
      }
    }
  );
}

// Função para compressão de vídeo
function compressVideo(selectedBitrate, inputFile) {
  // Tamanho inicial do arquivo de entrada
  const initialSize = getFileSizeMB(inputFile);

  // Construindo o caminho do arquivo de saída
  const originalFileName = path.basename(inputFile, path.extname(inputFile));
  const formattedFileName = slugify(originalFileName, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
  const currentDate = new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/[-:]/g, "")
    .replace("T", "_");
  const hash = generateHash(originalFileName + currentDate);
  const outputFileName = `${formattedFileName}_${hash}.mp4`;
  const outputPath = path.join(__dirname, "output", outputFileName);

  // Verifica se a pasta de saída existe, senão, cria
  const outputFolder = path.dirname(outputPath);
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  // Configurações de compressão
  const compressionOptions = {
    videoBitrate: selectedBitrate,
    audioBitrate: "128k", // Ajustar taxa de bits de áudio conforme necessário
  };

  // Comando ffmpeg para comprimir vídeo
  const ffmpegCommand = `${ffmpegPath} -i "${inputFile}" -b:v ${compressionOptions.videoBitrate} -b:a ${compressionOptions.audioBitrate} "${outputPath}"`;

  // Executar comando ffmpeg
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(
        "\n❌ Ops! Parece que houve um problema durante a compressão do vídeo:"
          .red
      );
      console.error(`Erro: ${error.message}`.red);
      return;
    }

    // Tamanho final do arquivo comprimido
    const finalSize = getFileSizeMB(outputPath);
    console.log("\n✨ Vídeo comprimido com sucesso!\n".green);
    console.log(
      `📁 Tamanho inicial do arquivo: ${initialSize.toFixed(2)} MB`.yellow
    );
    console.log(
      `📦 Tamanho final do arquivo após a compressão: ${finalSize.toFixed(
        2
      )} MB`.yellow
    );
    console.log("💾 Vídeo comprimido salvo em:", outputPath.blue);
  });
}

// Se o caminho do arquivo foi fornecido como argumento, chamar a função para exibir o menu
if (process.argv[2]) {
  displayMenuAndPrompt(process.argv[2]);
} else {
  // Se o caminho do arquivo não foi fornecido como argumento, solicitar ao usuário
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "📂 Por favor, forneça o caminho do arquivo de vídeo a ser comprimido: ",
    (inputPath) => {
      rl.close();
      displayMenuAndPrompt(inputPath.replace(/"/g, "")); // Remover aspas do caminho do arquivo
    }
  );
}
