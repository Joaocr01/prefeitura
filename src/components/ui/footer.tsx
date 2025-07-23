// components/footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Prefeitura Municipal</h3>
            <p className="text-sm">
              Av. Principal, 1234 - Centro<br />
              Batayporã - MS, CEP: 12345-678<br />
              Telefone: (67) 1234-5678
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {['Notícias', 'Editais', 'Licitações', 'Contato'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-yellow-300 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
            <p className="text-sm">
              Segunda a Sexta: 08:00 - 17:00<br />
              Sábado: 08:00 - 12:00<br />
              Domingo: Fechado
            </p>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-4 text-center text-sm">
          <p>© {currentYear} Prefeitura Municipal de Batayporã. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
