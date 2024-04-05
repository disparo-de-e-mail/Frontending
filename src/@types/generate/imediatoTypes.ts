export type CreateEmail = {
  Assunto?: string
  Autor?: string
  Corpo?: string
  dataCriacao?: string
  To?: string
  Id?: string
  Status?: string
  Remetente?: string
}

export type CreateEmailErrors = Partial<CreateEmail>
