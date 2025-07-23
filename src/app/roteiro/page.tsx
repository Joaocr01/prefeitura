// app/roteiro/page.tsx
import React from 'react';

export default function RoteiroPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">📋 Roteiro de Utilização do Sistema</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">1. Acesso Inicial</h2>
        <p>
          Acesse a aplicação na <strong>porta 3000</strong>. Inicialmente, nenhuma postagem estará listada na
          página principal.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. Navegar até o Painel</h2>
        <p>
          No rodapé da página inicial, há uma seção chamada <strong>Links Rápidos</strong>. Clique no link
          <strong> "Painel"</strong> para acessar a área de gerenciamento de postagens.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">3. Criar uma Nova Postagem</h2>
        <ul className="list-disc pl-6">
          <li>Você será redirecionado para a rota <code>/postform</code>.</li>
          <li>Preencha o <strong>título</strong>, <strong>URL da foto</strong> (válida) e <strong>descrição</strong>.</li>
          <li>Clique em <strong>Criar Postagem</strong>.</li>
          <li>Você será redirecionado para a página inicial, onde a postagem será exibida com título, imagem, descrição e data.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">4. Editar ou Remover Postagens</h2>
        <p>
          Volte ao <strong>Links Rápidos &gt; Painel</strong> e clique em <strong>Editar Postagens</strong>.
        </p>
        <ul className="list-disc pl-6">
          <li>Será exibida uma lista com o título e data das postagens.</li>
          <li>Clique em <strong>Editar</strong> para modificar uma postagem.</li>
          <li>Atualize os dados e clique em <strong>Atualizar Postagem</strong>.</li>
          <li>Para deletar, clique em <strong>Remover</strong>.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">5. Ações</h2>
        <p>
          Na tela de lista de publicações, é possível criar novas postagens ou excluir qualquer uma diretamente.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Resumo do CRUD</h2>
        <ul className="list-disc pl-6">
          <li><strong>C</strong> – Criar Postagem</li>
          <li><strong>R</strong> – Ler/Listar Postagens</li>
          <li><strong>U</strong> – Atualizar Postagem</li>
          <li><strong>D</strong> – Deletar Postagem</li>
        </ul>
      </section>
      <section>
          <p>Como não é todo usuario que pode logar(Somente adm)</p>
          <p>Coloque esse Login</p>
          <p>email: jc018053@gmail.com</p>
          <p>senha: 998290811</p>
      </section>

      <p className="text-center mt-10 text-sm text-gray-500">
        Página de roteiro criada para facilitar a navegação e o entendimento do sistema.
      </p>
    </div>
  );
}
