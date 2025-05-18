export interface ServiceItem {
  title: string
  details: string
}

export interface Service {
  title: string
  description?: string
  items: ServiceItem[]
}

export interface Category {
  title: string
  description: string
  services: Service[]
}

export interface Pilar {
  title: string
  subtitle: string
  description: string
  categories: Record<string, Category>
}

export const pilaresData: Record<string, Pilar> = {
  software: {
    title: "Software",
    subtitle: "Soluções Tecnológicas Integradas",
    description:
      "Desenvolvemos e implementamos soluções de software personalizadas para atender às necessidades específicas do seu negócio, garantindo qualidade, escalabilidade e segurança.",
    categories: {
      desenvolvimento: {
        title: "Desenvolvimento de Software e Aplicativos",
        description:
          "Criamos soluções de software completas, desde aplicativos móveis até sistemas empresariais complexos, utilizando as mais modernas tecnologias e metodologias de desenvolvimento.",
        services: [
          {
            title: "Desenvolvimento Full-Stack",
            items: [
              {
                title: "Desenvolvimento Full-Stack",
                details:
                  "• Criação de sistemas empresariais completos<br>• Arquitetura escalável para ambientes corporativos<br>• Integração com sistemas legados<br>• Desenvolvimento em múltiplas linguagens (Java, Python, .NET, Node.js)",
              },
            ],
          },
          {
            title: "Aplicativos Móveis Enterprise",
            items: [
              {
                title: "Aplicativos Móveis Enterprise",
                details:
                  "• Apps nativos (iOS/Android) e multiplataforma (React Native, Flutter)<br>• Integração com sistemas internos e ERPs<br>• Funcionalidades offline e sincronização inteligente<br>• Design para segurança corporativa",
              },
            ],
          },
          {
            title: "Plataformas SaaS Customizadas",
            items: [
              {
                title: "Plataformas SaaS Customizadas",
                details:
                  "• Desenvolvimento de plataformas white-label<br>• Arquitetura multi-tenant<br>• Sistemas de billing e subscription<br>• Dashboards personalizáveis para diferentes perfis de usuário",
              },
            ],
          },
          {
            title: "APIs e Microsserviços",
            items: [
              {
                title: "APIs e Microsserviços",
                details:
                  "• Desenho de arquitetura de microsserviços<br>• Desenvolvimento de APIs RESTful e GraphQL<br>• Documentação automatizada (Swagger/OpenAPI)<br>• Estratégias de versionamento e backwards compatibility",
              },
            ],
          },
          {
            title: "Sistemas Web Complexos",
            items: [
              {
                title: "Sistemas Web Complexos",
                details:
                  "• Portais corporativos de alta performance<br>• Intranets e ferramentas de colaboração<br>• E-commerce B2B personalizado<br>• Plataformas de gestão de conteúdo enterprise",
              },
            ],
          },
        ],
      },
      planejamento: {
        title: "Planejamento e Design de Produtos Digitais",
        description:
          "Ajudamos a planejar e desenhar produtos digitais que atendam às necessidades dos usuários e aos objetivos de negócio, utilizando metodologias centradas no usuário e práticas ágeis.",
        services: [
          {
            title: "Discovery e Estratégia",
            items: [
              {
                title: "Discovery e Estratégia",
                details:
                  "• Workshops de imersão e definição de problema<br>• Pesquisa de usuários e stakeholders<br>• Mapeamento de jornadas e pain points<br>• Priorização de funcionalidades (MoSCoW, RICE)",
              },
            ],
          },
          {
            title: "UI/UX para Sistemas Empresariais",
            items: [
              {
                title: "UI/UX para Sistemas Empresariais",
                details:
                  "• Design systems para consistência corporativa<br>• Prototipagem de alta fidelidade<br>• Testes de usabilidade com usuários finais<br>• Acessibilidade (WCAG) e internacionalização",
              },
            ],
          },
          {
            title: "Design de Interação",
            items: [
              {
                title: "Design de Interação",
                details:
                  "• Arquitetura de informação<br>• Mapeamento de fluxos complexos<br>• Design de dashboards analíticos<br>• Visualização de dados para tomada de decisão",
              },
            ],
          },
          {
            title: "Product Management",
            items: [
              {
                title: "Product Management",
                details:
                  "• Definição de roadmaps estratégicos<br>• Criação e gestão de backlogs<br>• Rituais ágeis customizados para cada contexto<br>• Gestão de stakeholders e expectativas",
              },
            ],
          },
          {
            title: "Product Validation",
            items: [
              {
                title: "Product Validation",
                details:
                  "• Testes de conceito (POCs)<br>• MVPs estratégicos<br>• A/B testing estruturado<br>• Mecanismos de feedback e melhoria contínua",
              },
            ],
          },
        ],
      },
      bi: {
        title: "Business Intelligence e Análise de Dados",
        description:
          "Transformamos dados em insights acionáveis, desenvolvendo soluções de Business Intelligence e análise de dados que ajudam a tomar decisões baseadas em evidências.",
        services: [
          {
            title: "Data Warehousing",
            items: [
              {
                title: "Data Warehousing",
                details:
                  "• Modelagem dimensional (Star Schema, Snowflake)<br>• Implementação ETL/ELT (Airflow, dbt)<br>• Otimização de performance de queries<br>• Arquitetura para volumes massivos de dados",
              },
            ],
          },
          {
            title: "Dashboards Analíticos",
            items: [
              {
                title: "Dashboards Analíticos",
                details:
                  "• Desenvolvimento em plataformas enterprise (Tableau, Power BI, Looker)<br>• Visualizações customizadas com D3.js e frameworks modernos<br>• Dashboards self-service para times de negócio<br>• Alertas e notificações baseados em thresholds",
              },
            ],
          },
          {
            title: "Advanced Analytics",
            items: [
              {
                title: "Advanced Analytics",
                details:
                  "• Modelos de forecasting e estatística avançada<br>• Detecção de anomalias em dados corporativos<br>• Cohort analysis e segmentação<br>• Attribution modeling para marketing e vendas",
              },
            ],
          },
          {
            title: "Data Governance",
            items: [
              {
                title: "Data Governance",
                details:
                  "• Implementação de políticas de qualidade de dados<br>• Catálogos de dados e metadata management<br>• Privacidade (LGPD/GDPR) by design<br>• Master data management",
              },
            ],
          },
          {
            title: "Real-time Analytics",
            items: [
              {
                title: "Real-time Analytics",
                details:
                  "• Processamento de eventos em tempo real<br>• Arquiteturas para streaming de dados (Kafka, Kinesis)<br>• Dashboards em tempo real para operações críticas<br>• Monitoramento de KPIs com latência mínima",
              },
            ],
          },
        ],
      },
      automacao: {
        title: "Automação e DevOps",
        description:
          "Automatizamos processos e implementamos práticas de DevOps para aumentar a eficiência, reduzir erros e acelerar o ciclo de desenvolvimento e entrega de software.",
        services: [
          {
            title: "Automação de Processos (RPA)",
            items: [
              {
                title: "Automação de Processos (RPA)",
                details:
                  "• Mapeamento de processos para automação<br>• Implementação com UiPath, Automation Anywhere ou Blue Prism<br>• Integração com sistemas legados sem APIs<br>• Monitoramento e manutenção de bots",
              },
            ],
          },
          {
            title: "CI/CD Enterprise",
            items: [
              {
                title: "CI/CD Enterprise",
                details:
                  "• Pipelines automatizados de integração/entrega<br>• Setup de ambientes de staging e homologação<br>• Gestão de branches e workflow de código<br>• Automação de deploy com zero downtime",
              },
            ],
          },
          {
            title: "Infrastructure as Code",
            items: [
              {
                title: "Infrastructure as Code",
                details:
                  "• Automação de infraestrutura com Terraform, Ansible, CloudFormation<br>• Arquiteturas multi-cloud e disaster recovery<br>• Containerização com Docker e orquestração com Kubernetes<br>• Políticas de autoscaling e otimização de custos",
              },
            ],
          },
          {
            title: "Site Reliability Engineering",
            items: [
              {
                title: "Site Reliability Engineering",
                details:
                  "• Design para resiliência e alta disponibilidade<br>• Monitoramento avançado e observabilidade<br>• Políticas de incident response<br>• Game days e simulações de falha",
              },
            ],
          },
          {
            title: "Workflow Automation",
            items: [
              {
                title: "Workflow Automation",
                details:
                  "• Desenho de workflows empresariais<br>• Automação de aprovações e processos internos<br>• Low-code/no-code para times de negócio<br>• Integração entre departamentos e sistemas",
              },
            ],
          },
        ],
      },
      qualidade: {
        title: "Qualidade e Testes",
        description:
          "Garantimos a qualidade do software através de metodologias e ferramentas de teste avançadas, assegurando que as soluções atendam aos requisitos e funcionem conforme o esperado.",
        services: [
          {
            title: "Testes Automatizados End-to-End",
            items: [
              {
                title: "Testes Automatizados End-to-End",
                details:
                  "• Frameworks de automação (Selenium, Cypress, Playwright)<br>• Integração com pipelines de CI/CD<br>• Visual regression testing<br>• Cross-browser e cross-device testing",
              },
            ],
          },
          {
            title: "Testes de Performance",
            items: [
              {
                title: "Testes de Performance",
                details:
                  "• Load testing de sistemas críticos<br>• Stress testing e identificação de bottlenecks<br>• Monitoramento de performance em produção<br>• Otimização baseada em métricas reais",
              },
            ],
          },
          {
            title: "Segurança e Penetration Testing",
            items: [
              {
                title: "Segurança e Penetration Testing",
                details:
                  "• OWASP security testing automatizado<br>• Análise estática e dinâmica de código<br>• Simulações de ataques controlados<br>• Remediação de vulnerabilidades",
              },
            ],
          },
          {
            title: "Quality Assurance Estratégico",
            items: [
              {
                title: "Quality Assurance Estratégico",
                details:
                  "• Definição de quality gates e métricas<br>• Test-driven development (TDD)<br>• Behavior-driven development (BDD) com Cucumber/Gherkin<br>• Shift-left testing e testes de acessibilidade",
              },
            ],
          },
          {
            title: "Testes de Integração",
            items: [
              {
                title: "Testes de Integração",
                details:
                  "• Automação de testes entre sistemas<br>• Contract testing para APIs<br>• Mock services para sistemas externos<br>• Testes de cenários complexos multi-sistema",
              },
            ],
          },
        ],
      },
    },
  },
  inovacao: {
    title: "Inovação",
    subtitle: "Transformação Tecnológica e Cultural",
    description:
      "Impulsionamos a inovação através da aplicação estratégica de tecnologias emergentes e da transformação cultural, ajudando organizações a se adaptarem e prosperarem no ambiente digital.",
    categories: {
      estrategia: {
        title: "Estratégia de IA e Automação",
        description:
          "Desenvolvemos estratégias de Inteligência Artificial e automação alinhadas aos objetivos de negócio, identificando oportunidades de alto impacto e definindo roteiros de implementação.",
        services: [
          {
            title: "Assessment de Maturidade em IA",
            items: [
              {
                title: "Assessment de Maturidade em IA",
                details:
                  "• Diagnóstico de capacidades atuais em IA<br>• Identificação de use cases de alto impacto<br>• Gap analysis de dados, infraestrutura e talentos<br>• Benchmark com líderes do setor",
              },
            ],
          },
          {
            title: "Roadmap de IA Corporativa",
            items: [
              {
                title: "Roadmap de IA Corporativa",
                details:
                  "• Priorização estratégica de iniciativas de IA<br>• Definição de arquitetura técnica escalável<br>• Timeline de implementação por ondas<br>• Gestão de pré-requisitos e dependências",
              },
            ],
          },
          {
            title: "Design de Centro de Excelência em IA",
            items: [
              {
                title: "Design de Centro de Excelência em IA",
                details:
                  "• Estruturação de equipes multidisciplinares<br>• Definição de processos de governança<br>• Políticas de segurança e ética em IA<br>• Frameworks de escalonamento de soluções",
              },
            ],
          },
          {
            title: "Estratégia de Dados para IA",
            items: [
              {
                title: "Estratégia de Dados para IA",
                details:
                  "• Arquitetura de dados para modelos de IA<br>• Governance para machine learning<br>• Data quality management<br>• Estratégias de data labeling",
              },
            ],
          },
          {
            title: "Gestão de Portfólio de IA",
            items: [
              {
                title: "Gestão de Portfólio de IA",
                details:
                  "• Avaliação de ROI de iniciativas de IA<br>• Balanceamento entre quick wins e transformações<br>• Monitoramento contínuo de performance<br>• Ajustes estratégicos baseados em resultados",
              },
            ],
          },
        ],
      },
      implementacao: {
        title: "Implementação de Soluções de IA",
        description:
          "Implementamos soluções de Inteligência Artificial que resolvem problemas reais de negócio, desde agentes conversacionais até sistemas avançados de análise preditiva e visão computacional.",
        services: [
          {
            title: "Desenvolvimento de AI Agents",
            items: [
              {
                title: "Desenvolvimento de AI Agents",
                details:
                  "• Agentes conversacionais customizados<br>• RAG (Retrieval Augmented Generation) corporativo<br>• Fine-tuning de LLMs para domínios específicos<br>• Integração com knowledge bases internas",
              },
            ],
          },
          {
            title: "Computer Vision Enterprise",
            items: [
              {
                title: "Computer Vision Enterprise",
                details:
                  "• Sistemas de reconhecimento visual para indústria<br>• Quality control automatizado<br>• Sistemas de segurança baseados em visão<br>• Reconhecimento e processamento de documentos",
              },
            ],
          },
          {
            title: "Automação Cognitiva",
            items: [
              {
                title: "Automação Cognitiva",
                details:
                  "• Hyperautomation com componentes de IA<br>• Processos decisórios assistidos por IA<br>• Sistemas de recomendação interna<br>• Cognitive process automation (além do RPA tradicional)",
              },
            ],
          },
          {
            title: "Predictive Analytics",
            items: [
              {
                title: "Predictive Analytics",
                details:
                  "• Modelos preditivos para operações<br>• Forecasting avançado para supply chain<br>• Detecção proativa de problemas<br>• Manutenção preditiva industrial",
              },
            ],
          },
          {
            title: "Processamento de Linguagem Natural",
            items: [
              {
                title: "Processamento de Linguagem Natural",
                details:
                  "• Análise de sentimento para feedback de clientes<br>• Classificação automática de documentos<br>• Extração de informações de documentos não-estruturados<br>• Summarization de conteúdo corporativo",
              },
            ],
          },
        ],
      },
      consultoria: {
        title: "Consultoria Executiva em IA",
        description:
          "Oferecemos consultoria especializada para líderes executivos sobre como a Inteligência Artificial pode transformar seus negócios, abordando aspectos estratégicos, éticos e organizacionais.",
        services: [
          {
            title: "AI Literacy para C-Level",
            items: [
              {
                title: "AI Literacy para C-Level",
                details:
                  "• Workshops executivos sobre capacidades reais da IA<br>• Separação entre hype e valor tangível<br>• Casos de uso aplicados ao setor específico<br>• Implicações estratégicas da IA no negócio",
              },
            ],
          },
          {
            title: "AI Ethics e Governança",
            items: [
              {
                title: "AI Ethics e Governança",
                details:
                  "• Frameworks para uso responsável de IA<br>• Políticas de transparência e explicabilidade<br>• Gestão de vieses e fairness<br>• Compliance com regulações emergentes",
              },
            ],
          },
          {
            title: "AI as Competitive Advantage",
            items: [
              {
                title: "AI as Competitive Advantage",
                details:
                  "• Análise de disrupção do setor por IA<br>• Identificação de vantagens defensáveis<br>• Estratégias de diferenciação baseadas em IA<br>• Monitoramento competitivo em IA",
              },
            ],
          },
          {
            title: "Talent Strategy para IA",
            items: [
              {
                title: "Talent Strategy para IA",
                details:
                  "• Avaliação de necessidades de talento<br>• Modelos de upskilling da força de trabalho<br>• Build vs. buy para capacidades de IA<br>• Estruturas organizacionais para era da IA",
              },
            ],
          },
          {
            title: "Change Management para IA",
            items: [
              {
                title: "Change Management para IA",
                details:
                  "• Gestão de resistência à automação<br>• Comunicação de benefícios e impactos<br>• Engajamento de stakeholders<br>• Medição de adoção e resultados",
              },
            ],
          },
        ],
      },
      cultura: {
        title: "Cultura de Inovação e Escala",
        description:
          "Ajudamos a criar e fortalecer uma cultura de inovação, implementando programas e metodologias que incentivam a experimentação, a colaboração e a tomada de decisões baseada em dados.",
        services: [
          {
            title: "Design de Programas de Inovação",
            items: [
              {
                title: "Design de Programas de Inovação",
                details:
                  "• Estruturação de innovation labs<br>• Programas de ideação e intraempreendedorismo<br>• Mecanismos de inovação aberta<br>• Métricas de inovação e experimentação",
              },
            ],
          },
          {
            title: "Cultura Data-Driven",
            items: [
              {
                title: "Cultura Data-Driven",
                details:
                  "• Implementação de processos baseados em dados<br>• Democratização de analytics<br>• Frameworks decisórios baseados em evidências<br>• Desenvolvimento de data literacy",
              },
            ],
          },
          {
            title: "Design Thinking para Executivos",
            items: [
              {
                title: "Design Thinking para Executivos",
                details:
                  "• Workshops de resolução de problemas complexos<br>• Human-centered design para estratégia<br>• Técnicas de ideação estruturada<br>• Prototipagem de modelos de negócio",
              },
            ],
          },
          {
            title: "Metodologias Ágeis em Escala",
            items: [
              {
                title: "Metodologias Ágeis em Escala",
                details:
                  "• Implementação de SAFe, LeSS ou outras metodologias<br>• Transformação de governança para agilidade<br>• Portfolio management ágil<br>• Balanceamento entre agilidade e compliance",
              },
            ],
          },
          {
            title: "Digital Transformation Playbooks",
            items: [
              {
                title: "Digital Transformation Playbooks",
                details:
                  "• Frameworks para transformação<br>• Gestão de mudança organizacional<br>• Desenvolvimento de champions internos<br>• Medição de maturidade digital",
              },
            ],
          },
        ],
      },
      emergentes: {
        title: "Tecnologias Emergentes",
        description:
          "Exploramos e aplicamos tecnologias emergentes que podem criar vantagens competitivas, desde gêmeos digitais e simulação até blockchain, IoT industrial e realidade estendida.",
        services: [
          {
            title: "Applied Research",
            items: [
              {
                title: "Applied Research",
                details:
                  "• Laboratórios de experimentação<br>• Parcerias com universidades e centros de pesquisa<br>• Adaptação de tecnologias acadêmicas para aplicação comercial<br>• Technical due diligence de tecnologias emergentes",
              },
            ],
          },
          {
            title: "Digital Twins & Simulation",
            items: [
              {
                title: "Digital Twins & Simulation",
                details:
                  "• Modelagem virtual de operações físicas<br>• Simulações para otimização operacional<br>• Previsão de cenários e planejamento<br>• Integração com sistemas de gestão operacional",
              },
            ],
          },
          {
            title: "Blockchain & Web3 Enterprise",
            items: [
              {
                title: "Blockchain & Web3 Enterprise",
                details:
                  "• Use cases B2B para tecnologias descentralizadas<br>• Smart contracts para processos corporativos<br>• Supply chain tracking e verificação<br>• Tokenização de assets corporativos",
              },
            ],
          },
          {
            title: "Internet of Things Industrial",
            items: [
              {
                title: "Internet of Things Industrial",
                details:
                  "• Arquitetura para dispositivos conectados<br>• Edge computing e processamento distribuído<br>• Integração IoT com sistemas corporativos<br>• Segurança para dispositivos industriais",
              },
            ],
          },
          {
            title: "Extended Reality (AR/VR)",
            items: [
              {
                title: "Extended Reality (AR/VR)",
                details:
                  "• Aplicações industriais de realidade aumentada<br>• Treinamentos em ambiente virtual<br>• Digital workplace com componentes XR<br>• Manutenção remota assistida",
              },
            ],
          },
        ],
      },
    },
  },
  venture: {
    title: "Venture",
    subtitle: "Estratégias de Capital e Crescimento",
    description:
      "Oferecemos serviços especializados em investimentos estratégicos, corporate venture capital, aceleração de startups e M&A, ajudando organizações a crescer e inovar através de parcerias e aquisições.",
    categories: {
      consultoria: {
        title: "Consultoria Executiva em Investimentos",
        description:
          "Assessoramos executivos na definição e implementação de estratégias de investimento em tecnologia, realizando due diligence, valoração de ativos e gestão de riscos.",
        services: [
          {
            title: "Estratégia de Investimento Tecnológico",
            items: [
              {
                title: "Estratégia de Investimento Tecnológico",
                details:
                  "• Definição de teses de investimento<br>• Alinhamento com objetivos estratégicos corporativos<br>• Balanceamento de portfolio de investimentos<br>• Mecanismos de avaliação e seleção",
              },
            ],
          },
          {
            title: "Due Diligence Tecnológica",
            items: [
              {
                title: "Due Diligence Tecnológica",
                details:
                  "• Avaliação de soluções e propriedade intelectual<br>• Technical debt assessment<br>• Análise de escalabilidade técnica<br>• Verificação de stack tecnológico",
              },
            ],
          },
          {
            title: "Valoração de Ativos Tecnológicos",
            items: [
              {
                title: "Valoração de Ativos Tecnológicos",
                details:
                  "• Metodologias de valuation para startups<br>• Análise comparativa de mercado<br>• Projeções financeiras baseadas em métricas SaaS<br>• Avaliação de propriedade intelectual",
              },
            ],
          },
          {
            title: "Gestão de Portfolio de Investimentos",
            items: [
              {
                title: "Gestão de Portfolio de Investimentos",
                details:
                  "• Frameworks de monitoramento<br>• Balanced scorecard para startups<br>• Estratégias de follow-on investment<br>• Preparação para exits",
              },
            ],
          },
          {
            title: "Risk Management",
            items: [
              {
                title: "Risk Management",
                details:
                  "• Avaliação de riscos tecnológicos<br>• Mitigação de riscos regulatórios<br>• Estratégias de proteção de investimento<br>• Contingências para cenários adversos",
              },
            ],
          },
        ],
      },
      cvc: {
        title: "Corporate Venture Capital",
        description:
          "Ajudamos a estruturar e operar fundos de Corporate Venture Capital, definindo teses de investimento, processos de sourcing e screening, e estratégias de integração com o negócio principal.",
        services: [
          {
            title: "Design de Fundos CVC",
            items: [
              {
                title: "Design de Fundos CVC",
                details:
                  "• Estruturação jurídica e governança<br>• Definição de políticas de investimento<br>• Alinhamento com estratégia corporativa<br>• Mecanismos de incentivo e performance",
              },
            ],
          },
          {
            title: "Operação de CVC",
            items: [
              {
                title: "Operação de CVC",
                details:
                  "• Processos de sourcing e screening<br>• Análise de oportunidades<br>• Negociação e estruturação de deals<br>• Reporting para stakeholders corporativos",
              },
            ],
          },
          {
            title: "Strategic vs. Financial Investments",
            items: [
              {
                title: "Strategic vs. Financial Investments",
                details:
                  "• Frameworks para classificação de investimentos<br>• Métricas diferenciadas por tipo<br>• Integração com unidades de negócio<br>• Horizons de investimento e retorno",
              },
            ],
          },
          {
            title: "Ecossistema de Inovação",
            items: [
              {
                title: "Ecossistema de Inovação",
                details:
                  "• Mapeamento de players relevantes<br>• Parcerias com aceleradoras e VCs<br>• Relacionamento com universidades<br>• Posicionamento no ecossistema global",
              },
            ],
          },
          {
            title: "CVC como Radar Tecnológico",
            items: [
              {
                title: "CVC como Radar Tecnológico",
                details:
                  "• Monitoramento de tendências via portfolio<br>• Early warning systems para disrupção<br>• Identificação de oportunidades emergentes<br>• Intelligence gathering estruturado",
              },
            ],
          },
        ],
      },
      aceleracao: {
        title: "Programas de Aceleração e Incubação",
        description:
          "Desenhamos e operamos programas de aceleração e incubação corporativos, conectando startups com recursos, mentoria e oportunidades de negócio dentro da organização.",
        services: [
          {
            title: "Design de Programas Corporativos",
            items: [
              {
                title: "Design de Programas Corporativos",
                details:
                  "• Definição de objetivos e estrutura<br>• Critérios de seleção alinhados à estratégia<br>• Frameworks de mentoria e suporte<br>• Métricas de sucesso e KPIs",
              },
            ],
          },
          {
            title: "Operação de Aceleradoras",
            items: [
              {
                title: "Operação de Aceleradoras",
                details:
                  "• Processos de captação e seleção<br>• Curriculum de aceleração customizado<br>• Demo days e showcases<br>• Gestão da comunidade de startups",
              },
            ],
          },
          {
            title: "Mentoria Estratégica",
            items: [
              {
                title: "Mentoria Estratégica",
                details:
                  "• Matching de mentores corporativos<br>• Programas de executive sponsorship<br>• Mentoria técnica especializada<br>• Conexão com mercado e clientes",
              },
            ],
          },
          {
            title: "Acesso a Recursos",
            items: [
              {
                title: "Acesso a Recursos",
                details:
                  "• Sandboxes técnicos para startups<br>• Acesso a dados e APIs corporativas<br>• Infraestrutura compartilhada<br>• Recursos humanos especializados",
              },
            ],
          },
          {
            title: "Corporate-Startup Engagement",
            items: [
              {
                title: "Corporate-Startup Engagement",
                details:
                  "• Provas de conceito estruturadas<br>• Fast-track para procurement<br>• Co-desenvolvimento de soluções<br>• White-label e distribution partnerships",
              },
            ],
          },
        ],
      },
      building: {
        title: "Venture Building",
        description:
          "Criamos e desenvolvemos novos negócios do zero, desde a ideação até o scale-up, incluindo spin-offs corporativos e empreendimentos independentes com potencial de alto crescimento.",
        services: [
          {
            title: "Ideação Estratégica",
            items: [
              {
                title: "Ideação Estratégica",
                details:
                  "• Identificação de white spaces no mercado<br>• Validação de oportunidades<br>• Desenho de proposta de valor<br>• Business model canvas e validação",
              },
            ],
          },
          {
            title: "Company Building",
            items: [
              {
                title: "Company Building",
                details:
                  "• Formação de equipe fundadora<br>• Desenvolvimento de MVP<br>• Validação com early adopters<br>• Preparação para market fit",
              },
            ],
          },
          {
            title: "Spin-offs Corporativos",
            items: [
              {
                title: "Spin-offs Corporativos",
                details:
                  "• Identificação de oportunidades internas<br>• Estruturação jurídica e de incentivos<br>• Desacoplamento de processos corporativos<br>• Transição para entidade independente",
              },
            ],
          },
          {
            title: "Venture Studio",
            items: [
              {
                title: "Venture Studio",
                details:
                  "• Shared resources para múltiplos empreendimentos<br>• Playbooks de crescimento<br>• Recursos reutilizáveis (legal, HR, finance)<br>• Portfolio management ativo",
              },
            ],
          },
          {
            title: "Scale Up",
            items: [
              {
                title: "Scale Up",
                details:
                  "• Estratégias de crescimento acelerado<br>• Preparação para captação de recursos<br>• Construção de equipes em estágio inicial<br>• Go-to-market execution",
              },
            ],
          },
        ],
      },
      ma: {
        title: "M&A e Estruturação",
        description:
          "Assessoramos em processos de fusões e aquisições, desde a identificação de alvos estratégicos até a integração pós-fusão, garantindo a captura de valor e sinergias.",
        services: [
          {
            title: "Scouting Estratégico",
            items: [
              {
                title: "Scouting Estratégico",
                details:
                  "• Identificação de alvos de aquisição<br>• Mapeamento tecnológico de mercado<br>• Análise de fit estratégico<br>• Aproximação inicial e relacionamento",
              },
            ],
          },
          {
            title: "Due Diligence Completa",
            items: [
              {
                title: "Due Diligence Completa",
                details:
                  "• Technical due diligence<br>• Commercial due diligence<br>• Análise de talento e cultura<br>• Validação de propriedade intelectual",
              },
            ],
          },
          {
            title: "Negociação e Estruturação",
            items: [
              {
                title: "Negociação e Estruturação",
                details:
                  "• Modelagem financeira<br>• Estruturação de deal terms<br>• Incentivos e earnouts<br>• Proteções e garantias",
              },
            ],
          },
          {
            title: "Post-Merger Integration",
            items: [
              {
                title: "Post-Merger Integration",
                details:
                  "• Planos de integração técnica e cultural<br>• Captura de sinergias<br>• Retenção de talentos-chave<br>• Quick wins pós-aquisição",
              },
            ],
          },
          {
            title: "Captação de Recursos",
            items: [
              {
                title: "Captação de Recursos",
                details:
                  "• Estruturação de rounds de investimento<br>• Preparação de pitch decks e materiais<br>• Relacionamento com investidores<br>• Términos e condições favoráveis",
              },
            ],
          },
        ],
      },
    },
  },
}
