import { Typography } from "@mui/material";

export default function Page() {
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto pt-20">
        <Typography variant="h4" className="pb-4" fontWeight={700}>
          Política de Privacidade - LGPD
        </Typography>
        <Typography variant="h6">
          A sua privacidade é importante para nós. Esta Política de Privacidade
          explica como coletamos, usamos, compartilhamos e protegemos suas
          informações pessoais em conformidade com a Lei Geral de Proteção de
          Dados (LGPD).
        </Typography>

        <Typography variant="h5" className="pt-5" fontWeight={600}>
          1. Coleta de Informações Pessoais
        </Typography>

        <Typography variant="body1" className="py-3">
          Coletamos informações pessoais fornecidas diretamente por você ao:
        </Typography>

        <ul className="pl-5">
          <li>Preencher formulários no site</li>
          <li>Criar uma conta</li>
          <li>Assinar newsletters</li>
          <li>Enviar mensagens através de formulários de contato</li>
        </ul>

        <Typography variant="body1" className="py-3">
          As informações coletadas podem incluir, mas não se limitam a:
        </Typography>

        <ul className="pl-5">
          <li>Nome completo</li>
          <li>Endereço de e-mail</li>
          <li>Telefone</li>
          <li>Dados de navegação e endereço IP</li>
        </ul>

        <Typography variant="h5" className="pt-5" fontWeight={600}>
          2. Uso das Informações
        </Typography>

        <Typography variant="body1" className="py-3">
          As informações coletadas são utilizadas para:
        </Typography>

        <ul className="pl-5">
          <li>Fornecer os serviços solicitados</li>
          <li>Melhorar a experiência do usuário</li>
          <li>Enviar comunicações relevantes e personalizadas</li>
          <li>Garantir a segurança e integridade do site</li>
        </ul>

        <Typography variant="h5" className="pt-5" fontWeight={600}>
          3. Compartilhamento de Dados
        </Typography>

        <Typography variant="body1" className="py-3">
          Não compartilhamos suas informações pessoais com terceiros, exceto
          quando necessário para:
        </Typography>

        <ul className="pl-5">
          <li>Cumprir obrigações legais</li>
          <li>Executar contratos com você</li>
          <li>Fornecer serviços de parceiros de tecnologia essenciais</li>
        </ul>

        <Typography variant="h5" className="pt-5" fontWeight={600}>
          4. Cookies e Tecnologias Similares
        </Typography>

        <Typography variant="body1" className="py-3">
          Utilizamos cookies para melhorar a experiência no site. Você pode
          gerenciar suas preferências de cookies através das configurações do
          seu navegador.
        </Typography>

        <Typography variant="h5" className="pt-5" fontWeight={600}>
          5. Segurança
        </Typography>

        <Typography variant="body1" className="py-3">
          Adotamos medidas de segurança apropriadas para proteger suas
          informações contra acesso não autorizado, perda, uso indevido ou
          divulgação.
        </Typography>

        <Typography variant="h5" className="pt-5" fontWeight={600}>
          6. Seus Direitos
        </Typography>

        <Typography variant="body1" className="py-3">
          De acordo com a LGPD, você tem direito a:
        </Typography>

        <ul className="pl-5">
          <li>Acessar, corrigir ou excluir seus dados pessoais</li>
          <li>Solicitar a portabilidade dos seus dados</li>
          <li>
            Retirar seu consentimento para o uso de dados a qualquer momento
          </li>
        </ul>

        <Typography variant="body1" className="py-3">
          Para exercer seus direitos, entre em contato conosco pelo e-mail{" "}
          <a href="mailto:seu-email@dominio.com">seu-email@dominio.com</a>.
        </Typography>

        <Typography variant="h5" className="pt-5" fontWeight={600}>
          7. Alterações na Política de Privacidade
        </Typography>

        <Typography variant="body1" className="py-3">
          Reservamo-nos o direito de atualizar esta política periodicamente. A
          data da última atualização será indicada no início desta política.
        </Typography>

        <Typography variant="h5" className="pt-5" fontWeight={600}>
          8. Contato
        </Typography>

        <Typography variant="body1" className="py-3">
          Se tiver dúvidas sobre esta política ou o uso de seus dados, entre em
          contato:
        </Typography>

        <ul className="pl-5">
          <li>
            <strong>Nome da Empresa</strong>
          </li>
          <li>
            <strong>Endereço</strong>
          </li>
          <li>
            <strong>Telefone</strong>
          </li>
          <li>
            <strong>E-mail</strong>
          </li>
        </ul>

        <Typography variant="body1" className="py-3">
          <strong>Última atualização:</strong> [data de atualização].
        </Typography>
      </div>
    </div>
  );
}
