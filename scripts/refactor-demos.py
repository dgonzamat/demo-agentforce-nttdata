"""Refactor 6 demo pages to use ConsoleShell + ChatPanel layout.
Run from project root: python scripts/refactor-demos.py
"""
import re
from pathlib import Path

# Common imports that replace the old icon imports + Button + speed/etc
NEW_IMPORTS = """import { useState } from "react"
import {
  Check,
  Building,
  Building2,
  User,
  Briefcase,
  Activity,
  Sparkles,
  ChevronRight,
  Phone,
  ShoppingBag,
  Plane,
  HardHat,
  Zap,
  CreditCard,
  TrendingUp,
  Star,
  HelpCircle,
  FileText,
  FileCheck,
  FileSignature,
  CheckCircle,
  BarChart,
  Heart,
  Shield,
  Umbrella,
  Wifi,
  Database,
  Headphones,
  Tag,
  Truck,
  ClipboardList,
  Calendar,
  PlaneTakeoff,
  PlaneLanding,
  MapPin,
  Compass,
  Settings,
  AlertTriangle,
  Hammer,
  Lightbulb,
  Droplet,
  Receipt,
  Gauge,
  Lock,
  Network,
  Server,
  DollarSign,
  Percent,
  ShoppingCart,
  Search,
  Edit,
  Bell,
  ClipboardCheck,
  Users,
  Clock,
  BarChart2,
  PlaneIcon as Airplane,
} from "lucide-react"
import { useConversationPlayer } from "@/hooks/use-conversation-player"
import { useIdentityVerification } from "@/hooks/use-identity-verification"
import { useDigitalSignature } from "@/hooks/use-digital-signature"
import { useFullscreen } from "@/hooks/use-fullscreen"
import { IdentityPanel } from "@/components/demo/identity-panel"
import { SignaturePanel } from "@/components/demo/signature-panel"
{extra_panels}
import { MessageRenderer } from "@/components/demo/message-renderer"
import { ConsoleShell, ConsoleCard, FieldRow } from "@/components/demo/console-shell"
import { ChatPanel } from "@/components/demo/chat-panel"
import { asset } from "@/lib/asset"
"""

ROW_AND_NBA_HELPERS = '''

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900 font-medium">{value}</span>
    </div>
  )
}

function NextAction({ title, description, cta }: { title: string; description: string; cta: string }) {
  return (
    <div className="border rounded-md p-3">
      <div className="flex items-start gap-2 mb-2">
        <div className="text-sm font-semibold text-blue-700 leading-tight">{title}</div>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">{description}</p>
      <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
        {cta}
        <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  )
}
'''


def build_return(cfg: dict) -> str:
    panels_render = ""
    if cfg.get("contractor"):
        panels_render += """\n                renderContractorPanel={
                  msg.showContractorPanel && !msg.typing
                    ? () => (
                        <ContractorCompliancePanel
                          complianceComplete={complianceComplete}
                          completeCompliance={completeCompliance}
                          contractorVerified={contractorVerified}
                          startContractorVerification={startContractorVerification}
                        />
                      )
                    : undefined
                }"""
    if cfg.get("consumption"):
        panels_render += """\n                renderConsumptionPanel={
                  msg.showConsumptionPanel && !msg.typing
                    ? () => <ConsumptionPanel onComplete={() => {}} />
                    : undefined
                }"""
    if cfg.get("tarifa"):
        panels_render += """\n                renderTarifaPanel={
                  msg.showTarifaPanel && !msg.typing
                    ? () => <TarifaPanel onComplete={() => {}} />
                    : undefined
                }"""

    customer_360_tabs = " ".join(f'"{t}"' for t in cfg["customer_360_tabs"])
    customer_360_tabs_arr = f"[{', '.join(repr(t) for t in cfg['customer_360_tabs'])}]"

    customer_fields = "\n              ".join(
        f'<FieldRow label="{k}" value="{v}" />' for k, v in cfg["customer_fields"]
    )
    customer_360_rows = "\n              ".join(
        f'<Row label="{k}" value={{{v}}} />' if v.startswith("<") else f'<Row label="{k}" value="{v}" />'
        for k, v in cfg["customer_360_rows"]
    )

    right_card_fields = "\n              ".join(
        f'<FieldRow label="{k}" value="{v}" />' for k, v in cfg["right_card_fields"]
    )

    nba_blocks = ""
    for action in cfg["next_best_actions"]:
        nba_blocks += f"""
              <NextAction
                title="{action['title']}"
                description="{action['description']}"
                cta="{action['cta']}"
              />"""

    return f"""  const currentStageName = processStages.find((s) => s.id === currentProcessStage)?.name || ""

  return (
    <ConsoleShell
      industryConsole="{cfg['console_label']}"
      customerName="{cfg['customer_name']}"
      playing={{playing}}
      progress={{progress}}
      onTogglePlay={{togglePlay}}
      onReset={{handleReset}}
      leftPanel={{
        <>
          <ConsoleCard
            icon={{
              <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
                <User className="h-5 w-5 text-slate-500" />
              </div>
            }}
            title="Customer"
          >
            <div className="text-base font-semibold text-slate-900 -mt-2 mb-3">{cfg['customer_name']}</div>
            <div className="grid grid-cols-2 gap-3">
              {customer_fields}
            </div>
          </ConsoleCard>

          <ConsoleCard
            icon={{
              <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
            }}
            title="Customer 360"
          >
            <div className="-mx-4 -mt-4 px-4 border-b flex gap-4 text-xs">
              {{{customer_360_tabs_arr}.map((t, i) => (
                <button
                  key={{t}}
                  className={{`py-2 -mb-px ${{
                    i === 0
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-slate-500 hover:text-slate-700"
                  }}`}}
                >
                  {{t}}
                </button>
              ))}}
            </div>
            <div className="space-y-3 pt-4">
              {customer_360_rows}
            </div>
          </ConsoleCard>

          <ConsoleCard title="Etapas del proceso">
            <ol className="space-y-0.5 -mx-1">
              {{processStages.map((stage) => {{
                const Icon = stage.icon
                const isDone = currentProcessStage > stage.id
                const isActive = currentProcessStage === stage.id
                return (
                  <li key={{stage.id}} className="relative">
                    <div
                      className={{`flex items-center gap-2.5 p-1.5 rounded transition-colors ${{
                        isActive ? "bg-blue-50" : ""
                      }}`}}
                    >
                      <div
                        className={{`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${{
                          isDone
                            ? "bg-blue-600 text-white"
                            : isActive
                            ? "bg-white border-2 border-blue-600 text-blue-600"
                            : "bg-slate-100 text-slate-400"
                        }}`}}
                      >
                        {{isDone ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}}
                      </div>
                      <span
                        className={{`text-xs leading-tight ${{
                          isActive
                            ? "font-semibold text-slate-900"
                            : isDone
                            ? "text-slate-700"
                            : "text-slate-500"
                        }}`}}
                      >
                        {{stage.name}}
                      </span>
                    </div>
                  </li>
                )
              }})}}
            </ol>
          </ConsoleCard>
        </>
      }}
      rightPanel={{
        <>
          <ConsoleCard
            icon={{
              <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center">
                <{cfg['right_icon']} className="h-4 w-4 text-blue-600" />
              </div>
            }}
            title="{cfg['right_card_title']}"
            badge={{
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">{cfg['right_card_badge']}</span>
            }}
          >
            <div className="space-y-3">
              {right_card_fields}
            </div>
          </ConsoleCard>

          <ConsoleCard
            icon={{
              <div className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-emerald-600" />
              </div>
            }}
            title="Recommended Next Best Action"
          >
            <div className="space-y-3">{nba_blocks}
            </div>
          </ConsoleCard>

          <ConsoleCard
            icon={{
              <div className="w-7 h-7 rounded-md bg-violet-50 flex items-center justify-center">
                <Activity className="h-4 w-4 text-violet-600" />
              </div>
            }}
            title="Etapa actual"
          >
            <div className="space-y-3">
              <FieldRow label="Stage" value={{currentStageName}} />
              <div>
                <div className="text-slate-500 text-xs mb-1">Progreso</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{{{ width: `${{progress}}%` }}}}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700 tabular-nums">{{Math.round(progress)}}%</span>
                </div>
              </div>
            </div>
          </ConsoleCard>
        </>
      }}
    >
      <ChatPanel assistantTitle="{cfg['assistant_title']}">
        {{messages.map(
          (msg, index) =>
            msg.visible && (
              <MessageRenderer
                key={{index}}
                message={{msg}}
                avatars={{avatars}}
                renderSignaturePanel={{
                  msg.showSignaturePanel && !msg.typing
                    ? () => (
                        <SignaturePanel
                          signatureComplete={{signatureComplete}}
                          completeSignature={{completeSignature}}
                        />
                      )
                    : undefined
                }}
                renderIdentityPanel={{
                  msg.showIdentityPanel && !msg.typing
                    ? () => (
                        <IdentityPanel
                          faceScanComplete={{faceScanComplete}}
                          scanProgress={{scanProgress}}
                          faceDetected={{faceDetected}}
                          startFaceScan={{startFaceScan}}
                          completeIdentity={{completeIdentity}}
                        />
                      )
                    : undefined
                }}{panels_render}
              />
            ),
        )}}
        <div ref={{messagesEndRef}} />
      </ChatPanel>
    </ConsoleShell>
  )
}}
"""


CONFIGS = {
    "app/banking/demo/page.tsx": {
        "extra_panels": "",
        "console_label": "Banking Service Console",
        "customer_name": "María González",
        "customer_fields": [
            ("Customer ID", "CUST-88473291"),
            ("Segment", "Premium"),
            ("Cliente desde", "May 12, 2020"),
            ("Relationship Mgr", "Laura Pérez"),
        ],
        "customer_360_tabs": ["Summary", "Accounts", "Loans", "Related"],
        "customer_360_rows": [
            ("Lifetime Value", "Gold"),
            ("Relationship Value", "$245.750.000"),
            ("Productos activos", "7"),
            ("Antigüedad", "5 años"),
            ("Crédito vigente", "Hipotecario"),
            ("Risk Score", '<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Low</span>'),
        ],
        "right_icon": "Building2",
        "right_card_title": "Portabilidad financiera",
        "right_card_badge": "En proceso",
        "right_card_fields": [
            ("Banco origen", "BancoTech"),
            ("Banco destino", "NTT Bank"),
            ("Producto", "Crédito Hipotecario"),
            ("Saldo actual", "$45.200.000"),
            ("Ahorro proyectado", "$3.800.000"),
        ],
        "next_best_actions": [
            {
                "title": "Ofrecer Cuenta Vista Premium",
                "description": "El cliente califica para zero comisión y mejor tasa preferencial al portarse.",
                "cta": "Enviar oferta",
            },
            {
                "title": "Bundle con Tarjeta de Crédito",
                "description": "Aprobado pre-evaluado. Combo aumenta engagement y NPS.",
                "cta": "Ver beneficios",
            },
        ],
        "assistant_title": "Agentforce Banking Assistant",
    },
    "app/telecom/demo/page.tsx": {
        "extra_panels": "",
        "console_label": "Telecom Service Console",
        "customer_name": "Juan Pérez",
        "customer_fields": [
            ("Customer ID", "CUST-19283746"),
            ("Plan", "Móvil 80GB"),
            ("Cliente desde", "Aug 03, 2021"),
            ("Tier", "Plata"),
        ],
        "customer_360_tabs": ["Summary", "Líneas", "Servicios", "Related"],
        "customer_360_rows": [
            ("ARPU", "$28.500 / mes"),
            ("Líneas activas", "3"),
            ("Antigüedad", "4 años"),
            ("Plan actual", "Móvil 80GB"),
            ("Datos consumidos (mes)", "62 GB / 80 GB"),
            ("NPS", '<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Promotor</span>'),
        ],
        "right_icon": "Phone",
        "right_card_title": "Caso en curso",
        "right_card_badge": "Abierto",
        "right_card_fields": [
            ("Caso #", "CASE-00457821"),
            ("Tipo", "Soporte técnico"),
            ("Categoría", "Conectividad"),
            ("Prioridad", "Alta"),
            ("SLA restante", "3h 22m"),
        ],
        "next_best_actions": [
            {
                "title": "Upgrade a Plan Ilimitado",
                "description": "Cliente consume 78% del plan. Upgrade evita roaming y aumenta CLTV.",
                "cta": "Enviar propuesta",
            },
            {
                "title": "Bundle con Internet Hogar",
                "description": "Cobertura confirmada en domicilio. Descuento cruzado del 20%.",
                "cta": "Ver bundle",
            },
        ],
        "assistant_title": "Agentforce Telecom Assistant",
    },
    "app/retail/demo/page.tsx": {
        "extra_panels": "",
        "console_label": "Retail Service Console",
        "customer_name": "Sofia Martínez",
        "customer_fields": [
            ("Customer ID", "CUST-00987654"),
            ("Loyalty Tier", "Platinum"),
            ("Cliente desde", "May 04, 2021"),
            ("Tienda", "Polanco"),
        ],
        "customer_360_tabs": ["Summary", "Orders", "Returns", "Loyalty"],
        "customer_360_rows": [
            ("Lifetime Spend", "$18.450.000"),
            ("Total Orders", "24"),
            ("Average Order Value", "$768.000"),
            ("Returns", "2"),
            ("Loyalty Points", "3,250 pts"),
            ("Loyalty Tier", '<span className="bg-violet-100 text-violet-700 text-xs font-medium px-2 py-0.5 rounded">Platinum</span>'),
        ],
        "right_icon": "ShoppingBag",
        "right_card_title": "Order Summary",
        "right_card_badge": "Delivered",
        "right_card_fields": [
            ("Order Number", "ORD-00078456"),
            ("Order Date", "May 10, 2025"),
            ("Total", "$1.299.000"),
            ("Producto", "Zapatillas Urban Move"),
            ("Talla", "24,5 MX"),
        ],
        "next_best_actions": [
            {
                "title": "Ofrecer cambio de talla",
                "description": "El cliente ha mostrado interés en cambiar el tamaño del producto.",
                "cta": "Enviar recomendación",
            },
            {
                "title": "Promover membresía Plus",
                "description": "Sofía podría disfrutar envíos gratis y devoluciones extendidas.",
                "cta": "Ver beneficios",
            },
        ],
        "assistant_title": "Agentforce Retail Assistant",
    },
    "app/airline/demo/page.tsx": {
        "extra_panels": "",
        "console_label": "Airline Service Console",
        "customer_name": "Patricia Ruiz",
        "customer_fields": [
            ("Customer ID", "PAX-44521098"),
            ("FF Status", "Diamante"),
            ("Cliente desde", "Jan 14, 2018"),
            ("Hub preferido", "SCL"),
        ],
        "customer_360_tabs": ["Summary", "Reservas", "Millas", "Related"],
        "customer_360_rows": [
            ("Vuelos último año", "32"),
            ("Millas acumuladas", "184.500"),
            ("Categoría", "Diamante"),
            ("Spend anual", "$8.940.000"),
            ("Tasa puntualidad llegada", "94%"),
            ("Status", '<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Top Tier</span>'),
        ],
        "right_icon": "Plane",
        "right_card_title": "Reserva activa",
        "right_card_badge": "Confirmada",
        "right_card_fields": [
            ("PNR", "TRV-7H8K2L"),
            ("Ruta", "SCL → MEX"),
            ("Fecha", "May 22, 2025"),
            ("Clase", "Business"),
            ("Asiento", "3A"),
        ],
        "next_best_actions": [
            {
                "title": "Upgrade a First Class",
                "description": "Asientos disponibles. Cliente Diamante puede usar 30K millas.",
                "cta": "Ofrecer upgrade",
            },
            {
                "title": "Lounge VIP en SCL",
                "description": "Beneficio activo. Recordar acceso prioritario antes del vuelo.",
                "cta": "Notificar",
            },
        ],
        "assistant_title": "Agentforce Airline Assistant",
    },
    "app/mineria/demo/page.tsx": {
        "extra_panels": 'import { ContractorCompliancePanel } from "@/components/demo/contractor-compliance-panel"',
        "console_label": "Mining Service Console",
        "customer_name": "Andes Servicios SpA",
        "customer_fields": [
            ("RUT", "76.543.210-K"),
            ("Tipo", "Contratista"),
            ("Vigente desde", "Jul 18, 2020"),
            ("Faena asignada", "Los Pelambres"),
        ],
        "customer_360_tabs": ["Summary", "Compliance", "Personal", "Related"],
        "customer_360_rows": [
            ("Trabajadores activos", "147"),
            ("Tasa de cumplimiento", "96%"),
            ("Auditorías últ. año", "4"),
            ("Incidentes (12m)", "0"),
            ("Cert. seguridad", "Vigente"),
            ("Risk Score", '<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Low</span>'),
        ],
        "right_icon": "HardHat",
        "right_card_title": "Verificación normativa",
        "right_card_badge": "En proceso",
        "right_card_fields": [
            ("Documento principal", "Plan de Seguridad"),
            ("Norma aplicada", "DS-132 Minería"),
            ("Vencimiento", "Dec 31, 2025"),
            ("Inspector", "Marco Bravo"),
            ("Faena", "Los Pelambres"),
        ],
        "next_best_actions": [
            {
                "title": "Renovar curso de altura física",
                "description": "12 trabajadores con vencimiento próximo. Programar capacitación.",
                "cta": "Agendar",
            },
            {
                "title": "Auditoría documental anticipada",
                "description": "Adelantar revisión reduce riesgo de hallazgos en auditoría externa.",
                "cta": "Programar auditoría",
            },
        ],
        "assistant_title": "Agentforce Mining Assistant",
        "contractor": True,
    },
    "app/servicios-basicos/demo/page.tsx": {
        "extra_panels": 'import { ConsumptionPanel } from "@/components/demo/consumption-panel"\nimport { TarifaPanel } from "@/components/demo/tarifa-panel"',
        "console_label": "Utilities Service Console",
        "customer_name": "Carmen López",
        "customer_fields": [
            ("Customer ID", "CUST-44389017"),
            ("Servicio", "Eléctrico Residencial"),
            ("Cliente desde", "Mar 22, 2017"),
            ("Comuna", "Las Condes"),
        ],
        "customer_360_tabs": ["Summary", "Consumo", "Facturas", "Related"],
        "customer_360_rows": [
            ("Tarifa actual", "BT-1"),
            ("Consumo promedio", "245 kWh / mes"),
            ("Última factura", "$38.450"),
            ("Pagos al día", "Sí"),
            ("Reclamos abiertos", "0"),
            ("Status", '<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Activo</span>'),
        ],
        "right_icon": "Zap",
        "right_card_title": "Caso de tarifa",
        "right_card_badge": "Análisis",
        "right_card_fields": [
            ("Caso #", "UTIL-00892341"),
            ("Tipo", "Cambio de tarifa"),
            ("Tarifa actual", "BT-1"),
            ("Tarifa propuesta", "BT-2 horaria"),
            ("Ahorro estimado", "$5.200 / mes"),
        ],
        "next_best_actions": [
            {
                "title": "Activar lectura inteligente",
                "description": "Smart meter compatible. Permite tarifas horarias y reduce factura ~14%.",
                "cta": "Iniciar instalación",
            },
            {
                "title": "Plan de eficiencia energética",
                "description": "Diagnóstico gratuito + recomendaciones personalizadas.",
                "cta": "Agendar",
            },
        ],
        "assistant_title": "Agentforce Utilities Assistant",
        "consumption": True,
        "tarifa": True,
    },
}


def refactor(path: Path, cfg: dict) -> None:
    src = path.read_text(encoding="utf-8")
    lines = src.splitlines()

    # Find import block (from first import after "use client" to last consecutive import)
    first_import_idx = None
    last_import_idx = None
    for i, line in enumerate(lines):
        if line.startswith("import "):
            if first_import_idx is None:
                first_import_idx = i
            last_import_idx = i
        elif first_import_idx is not None and line.strip() == "":
            continue
        elif first_import_idx is not None and not line.startswith(("import ", "}", " ", "\t")):
            break

    # More robust: find all lines that are part of import statements
    # An import block can span multiple lines (multi-line imports). Track until we hit a line
    # that doesn't start with import/whitespace/closing brace.
    in_import = False
    last_import_idx = first_import_idx
    for i in range(first_import_idx, len(lines)):
        line = lines[i]
        if line.startswith("import "):
            in_import = True
            last_import_idx = i
            if "}" in line and "from" in line:
                in_import = False
        elif in_import:
            # multi-line import body
            last_import_idx = i
            if line.strip().startswith("}") or "from " in line:
                in_import = False
        elif line.strip() == "":
            continue
        else:
            break

    # Find return ( line
    return_idx = None
    for i, line in enumerate(lines):
        if line.startswith("  return ("):
            return_idx = i
            break
    if return_idx is None:
        raise SystemExit(f"no return ( in {path}")

    # Find closing brace of function (last `^}$`)
    close_idx = None
    for i in range(len(lines) - 1, -1, -1):
        if lines[i].strip() == "}":
            close_idx = i
            break

    # Build new content
    head = lines[: first_import_idx]  # everything before first import (e.g., "use client")
    middle = lines[last_import_idx + 1 : return_idx]  # between imports and return: function body
    new_imports = NEW_IMPORTS.replace("{extra_panels}", cfg.get("extra_panels", "")).rstrip()
    new_return = build_return(cfg).rstrip()

    out_parts = []
    out_parts.extend(head)
    out_parts.append(new_imports)
    out_parts.extend(middle)
    out_parts.append(new_return)
    out_parts.append(ROW_AND_NBA_HELPERS.rstrip())

    new_src = "\n".join(out_parts) + "\n"
    path.write_text(new_src, encoding="utf-8", newline="\n")
    print(f"refactored: {path}")


for rel, cfg in CONFIGS.items():
    refactor(Path(rel), cfg)
