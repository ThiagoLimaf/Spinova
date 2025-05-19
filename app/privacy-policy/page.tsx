import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidade | Spinova",
  description: "Política de Privacidade da Spinova - Como tratamos seus dados e cookies",
}

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

      <div className="prose prose-invert max-w-none">
        <p>Última atualização: 17 de maio de 2025</p>

        <h2>1. Introdução</h2>
        <p>
          A Spinova ("nós", "nosso" ou "nossa") está comprometida em proteger sua privacidade. Esta Política de
          Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso
          site spinova.solutions ("Site").
        </p>

        <h2>2. Informações que coletamos</h2>
        <p>Podemos coletar os seguintes tipos de informações:</p>
        <ul>
          <li>
            <strong>Informações pessoais:</strong> Nome, endereço de e-mail, número de telefone e outras informações de
            contato que você nos fornece voluntariamente.
          </li>
          <li>
            <strong>Informações de uso:</strong> Informações sobre como você usa nosso site, incluindo páginas
            visitadas, tempo gasto no site e links clicados.
          </li>
          <li>
            <strong>Informações do dispositivo:</strong> Tipo de dispositivo, sistema operacional, tipo de navegador e
            outras informações técnicas.
          </li>
        </ul>

        <h2>3. Como usamos cookies</h2>
        <p>
          Usamos cookies e tecnologias similares para melhorar sua experiência em nosso site, analisar o tráfego e
          personalizar o conteúdo. Os cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você
          visita nosso site.
        </p>
        <p>Utilizamos os seguintes tipos de cookies:</p>
        <ul>
          <li>
            <strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do site.
          </li>
          <li>
            <strong>Cookies analíticos:</strong> Ajudam-nos a entender como os visitantes interagem com o site,
            utilizando serviços como o Google Analytics.
          </li>
          <li>
            <strong>Cookies de preferências:</strong> Permitem que o site lembre de escolhas que você faz para
            proporcionar uma experiência mais personalizada.
          </li>
        </ul>

        <h2>4. Google Analytics</h2>
        <p>
          Utilizamos o Google Analytics para analisar o uso do nosso site. O Google Analytics coleta informações sobre o
          uso do site por meio de cookies. As informações coletadas são usadas para criar relatórios sobre o uso do
          site. O Google pode transferir essas informações a terceiros caso exigido por lei ou caso terceiros processem
          as informações em nome do Google.
        </p>
        <p>
          Você pode optar por não participar do Google Analytics instalando o{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            complemento de navegador para desativação do Google Analytics
          </a>
          .
        </p>

        <h2>5. Seus direitos</h2>
        <p>Dependendo da sua localização, você pode ter os seguintes direitos:</p>
        <ul>
          <li>Direito de acesso às suas informações pessoais</li>
          <li>Direito de retificação de informações incorretas</li>
          <li>Direito de exclusão de suas informações pessoais</li>
          <li>Direito de restringir o processamento de suas informações</li>
          <li>Direito à portabilidade de dados</li>
          <li>Direito de objeção ao processamento</li>
        </ul>

        <h2>6. Alterações nesta política</h2>
        <p>
          Podemos atualizar esta política de privacidade periodicamente. Recomendamos que você revise esta página
          regularmente para estar ciente de quaisquer alterações.
        </p>

        <h2>7. Contato</h2>
        <p>
          Se você tiver dúvidas sobre esta Política de Privacidade ou qualquer outro assunto, entre em contato conosco
          pelo e-mail:{" "}
          <a href="mailto:contato@spinova.org.br" className="text-primary hover:underline font-bold">
            contato@spinova.org.br
          </a>
        </p>
        <p className="mt-2">
          Estamos à disposição para atender suas necessidades e responder a quaisquer perguntas sobre nossos serviços.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-primary hover:underline">
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
