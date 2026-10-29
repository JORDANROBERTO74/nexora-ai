import type { Dictionary } from "./en";

export const es: Dictionary = {
  meta: {
    title: "Nexora — Inteligencia operativa para trabajo autónomo",
    description:
      "Nexora es el motor consciente del negocio para tus agentes de IA: capa de inteligencia central, grafo operativo de conocimiento y gobernanza para flujos entre áreas.",
    ogTagline: "El motor que entiende el negocio para tus agentes de IA.",
  },
  nav: {
    brand: "Nexora",
    homeLabel: "Inicio de Nexora",
    links: [
      { label: "Servicio", href: "#platform" },
      { label: "Funciones", href: "#features" },
      { label: "Soluciones", href: "#solutions" },
      { label: "Panel de control", href: "#control" },
      { label: "Demos", href: "#demos" },
      { label: "Piloto", href: "#pilot" },
    ],
    cta: "Empezar",
    localeLabel: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    eyebrow: "Inteligencia operativa para trabajo autónomo",
    subtitle: "El motor que entiende el negocio para tus agentes de IA",
    lead:
      "Nexora convierte los sistemas que ya usas en una sola capa de ejecución con contexto de negocio, con puertas de aprobación que tu equipo sigue controlando.",
    primaryCta: "Explorar Command Center",
    secondaryCta: "Ver soluciones",
  },
  systems: {
    label: "Se conecta a los sistemas que ya usas",
    items: ["Soporte", "Data warehouse", "OpenAPI", "CRM", "Facturación", "Chat"],
  },
  service: {
    eyebrow: "Nuestro servicio",
    leadStrong: "Nexora",
    leadBefore:
      " es la capa de inteligencia central que convierte tu stack fragmentado de SaaS y tus herramientas internas en un motor de ejecución consciente del negocio, gracias a un ",
    leadEmphasis: "grafo operativo de conocimiento",
    leadAfter:
      " que codifica tu lógica de negocio para dar contexto real a la IA. Con barandillas de seguridad, Nexora automatiza flujos complejos entre áreas con precisión absoluta.",
  },
  features: {
    titleLead: "Nuestras ",
    titleEmphasis: "funciones",
    items: [
      {
        title: "Capa de inteligencia central",
        text: "Un cerebro unificado que orquesta datos, aprobaciones, herramientas y lógica de negocio en toda la organización.",
      },
      {
        title: "Motor de ejecución consciente del negocio",
        text: "Va más allá de la automatización simple: entiende la intención, los objetivos de la empresa y el estado real de la operación.",
      },
      {
        title: "Grafo operativo de conocimiento",
        text: "Mapea las relaciones entre clientes, sistemas, tickets, herramientas y políticas para dar contexto real a la IA.",
      },
      {
        title: "Barandillas de seguridad",
        text: "Límites deterministas que mantienen las acciones sensibles conformes, auditables y derivadas a una persona cuando hace falta.",
      },
      {
        title: "Flujos entre áreas",
        text: "Conecta procesos entre departamentos dispersos, herramientas SaaS, infraestructura y colas de soporte.",
      },
    ],
  },
  solutions: {
    eyebrow: "Capacidades",
    title: "Resumen de soluciones",
    groups: [
      {
        title: "Mejora comercial",
        items: [
          "Protección proactiva de ingresos",
          "Nuevas oportunidades de ingresos",
          "Oportunidades de desarrollo comercial (I+D)",
        ],
      },
      {
        title: "Palanca operativa",
        items: [
          "Inteligencia operativa unificada",
          "Ejecución autónoma de flujos",
          "Escalado empresarial desacoplado",
          "Resolución contextual instantánea",
          "Gobernanza operativa absoluta",
          "Evolución operativa continua",
        ],
      },
    ],
  },
  control: {
    eyebrow: "Panel de control",
    title: "La cabina de mando para agentes, herramientas y la verdad operativa.",
    description:
      "El panel de control expone las superficies que necesita quien opera: ejecución de comandos, borradores de plan, controles de despliegue, mapas de negocio, gobernanza y flujos de tickets.",
    panels: [
      {
        title: "Centro de mando",
        text: "Describe un objetivo, observa cómo los agentes forman el plan y mantén a las personas en el bucle.",
      },
      {
        title: "Borrador de plan",
        text: "Llamadas a API, tareas de agente, condiciones, pasos de chat y puertas de aprobación, todo legible.",
      },
      {
        title: "Controles de despliegue",
        text: "Elige ejecución por calendario, evento, API o manual, con el agente y las barandillas correctas.",
      },
      {
        title: "Registros de gobernanza",
        text: "Cada ejecución, aprobación, usuario, fuente y decisión de política se convierte en evidencia.",
      },
    ],
  },
  leverage: {
    eyebrow: "Palanca operativa",
    title: "Una sola capa operativa para agentes que entienden el negocio.",
    highlights: [
      {
        title: "Contexto más rápido.",
        text: "Los agentes parten de un mapa de negocio aprobado, así saben qué sistema consultar y qué acción está permitida.",
      },
      {
        title: "Trabajo entre sistemas.",
        text: "Una sola petición puede aprovisionar infraestructura, actualizar tickets, consultar analítica y esperar trabajos largos.",
      },
      {
        title: "Riesgo bajo control.",
        text: "Las acciones de alto riesgo se detienen para aprobación, cada decisión queda registrada y los patrones mejoran la siguiente ejecución.",
      },
    ],
  },
  governance: {
    eyebrow: "Gobernanza",
    title: "Controles claros para una autonomía consciente del negocio.",
    description:
      "La gobernanza da a quien opera las barandillas y la evidencia que necesita: alcance de miembros, capacidades por rol, reglas de política, contexto de aprobación y registros inmutables de cada acción relevante de un agente.",
    items: [
      {
        title: "Control por roles",
        text: "Las capacidades definen quién gestiona miembros, roles, políticas, aprobaciones, exportaciones y acceso de agentes.",
      },
      {
        title: "Simulación de políticas",
        text: "Los administradores modelan reglas de espacio, departamento o agente antes de que afecten a flujos en producción.",
      },
      {
        title: "Colas de aprobación",
        text: "Los pasos de alto riesgo se detienen para revisión humana con el contexto necesario para aprobar, rechazar o redirigir.",
      },
      {
        title: "Registros de evidencia",
        text: "Los registros guardan cuenta, agente, flujo, aportación humana, fuente, canal y auditoría, con los valores sensibles redactados.",
      },
    ],
  },
  demos: {
    eyebrow: "Vívelo en acción",
    title: "Una solicitud, cuatro comprobaciones y una aprobación defendible.",
    description:
      "Una solicitud de compra entra en Nexora y sale como una decisión verificada: presupuesto, riesgo del proveedor, límites de gasto y condiciones del contrato comprobados contra sistemas en vivo, con la evidencia adjunta para quien aprueba.",
    note: "Interfaz del producto en inglés.",
    slots: [
      {
        title: "Aprobación de gasto con evidencia",
        description:
          "De una renovación de 48.000 $ a una aprobación enviada al CFO, con cada comprobación, puerta y decisión registradas.",
      },
    ],
  },
  pilot: {
    eyebrow: "Piloto de 30 días",
    title: "Empieza por un flujo crítico para los ingresos.",
    description:
      "Elige onboarding, respuesta técnica en una venta, triaje de incidencias, operaciones reguladas o recuperación de servicio. Toma la línea base, automatiza en modo supervisado y mide ciclo, throughput, calidad e impacto proyectado en ingresos.",
    primaryCta: "Diseñar un flujo",
    secondaryCta: "Revisar gobernanza",
    metrics: [
      { value: "14d", label: "hasta 3-5 d de ciclo de onboarding" },
      { value: "72h", label: "hasta menos de 8 h de respuesta técnica" },
      { value: "4.5h", label: "hasta 1,6 h de resolución de incidencias" },
      { value: "30-50%", label: "más de throughput operativo" },
    ],
  },
  footer: {
    brand: "Nexora",
    links: [
      { label: "Servicio", href: "#platform" },
      { label: "Funciones", href: "#features" },
      { label: "Soluciones", href: "#solutions" },
      { label: "Demos", href: "#demos" },
      { label: "Piloto", href: "#pilot" },
    ],
    copyright: "© 2026 Nexora",
  },
  notFound: {
    title: "Fuera del mapa.",
    body: "La página que buscas no existe o cambió de sitio.",
    cta: "Volver a Nexora",
  },
};
