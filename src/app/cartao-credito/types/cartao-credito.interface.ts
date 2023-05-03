import { ClienteInterface } from "src/app/clientes/types/cliente.interface"

export interface CartaoCreditoInterface {
  id: string
  idCliente: string
  cliente: ClienteInterface
  nome: string
  limite: number
  valorProximaFatura: number
  vencimentoFatura: Date
  diaFechamento: number
}