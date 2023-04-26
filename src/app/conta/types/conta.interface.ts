import { ClienteInterface } from "src/app/clientes/types/cliente.interface"

export interface ContaInterface {
  id: string
  idCliente: string
  cliente: ClienteInterface
  instituicao: string
  agencia: string
  conta: string
  saldo: string
}