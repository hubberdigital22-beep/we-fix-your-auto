import type { Copy } from './types';

export const pt: Copy = {
	locale: 'pt',
	htmlLang: 'pt-BR',

	meta: {
		title: 'Body shop em Tampa · Collision repair | Collision Auto Pros',
		description:
			'Bateu o carro? Guincho, claim e conserto em uma mensagem só. Oficina I-CAR Gold Class em Tampa. Atendimento em português.',
	},

	a11y: {
		skip: 'Pular para o conteúdo',
		nav: 'Seções',
		lang: 'Idioma',
		whatsappNew: 'abre o WhatsApp',
	},

	nav: { how: 'Como funciona', why: 'Por que a gente', faq: 'Perguntas' },

	cta: {
		whatsapp: 'Chama no WhatsApp',
		message: 'Oi, bati o carro e preciso de ajuda.',
	},

	towCondition: 'Guincho grátis fazendo o conserto com a gente.',

	hero: {
		eyebrow: 'Body shop · Collision repair',
		title: ['O acidente já aconteceu.', 'Do resto, a gente cuida.'],
		sub: 'Guincho, claim e conserto. Uma mensagem só.{*}',
		checks: [
			{ text: 'Oficina I-CAR Gold Class', flag: 'certifications' },
			{ text: 'O claim? A gente resolve' },
			{ text: 'Atendimento em português' },
		],
		cue: 'Bateu o carro? Comece aqui.',
	},

	journey: {
		label: 'Como funciona',
		title: 'Bateu o carro? Comece aqui.',
		steps: [
			{ title: 'Fale com a gente', text: 'Pelo WhatsApp, no seu idioma.' },
			{ title: 'Rebocamos seu carro{*}', text: 'O carro não anda? A gente busca.' },
			{ title: 'Cuidamos do claim', text: 'A gente fala com o seguro.' },
			{ title: 'Avaliamos o dano', text: 'Na oficina, com medição computadorizada.' },
			{ title: 'Consertamos', text: 'Com técnicos certificados e pintura de fábrica.' },
			{ title: 'Mantemos você atualizado', text: 'Você sabe como está o carro em cada etapa.' },
			{ title: 'Você volta pra rua', text: 'A gente devolve a chave. E a tranquilidade.' },
		],
	},

	speed: ['Sem carro não tem trabalho.', 'Por isso a gente é rápido.'],

	why: {
		label: 'Por que a gente',
		title: 'Certificados, falamos a sua língua e resolvemos o seguro por você.',
		items: [
			{
				flag: 'certifications',
				title: 'Certificados. Equipados. Confiáveis.',
				text: 'Oficina I-CAR Gold Class e técnicos certificados ASE. Medição computadorizada e pintura de fábrica: o que não aparece também é bem consertado.',
			},
			{
				title: 'A gente fala com o seguro.',
				text: 'A gente abre o claim por você e cuida de toda a papelada.',
			},
			{
				title: 'Atendimento em português.',
				text: 'Também em espanhol e inglês. Você escolhe o idioma.',
			},
			{
				title: 'De volta à rua, rápido.',
				text: 'Guincho, atualização constante e volta rápida ao trabalho.',
			},
			{
				flag: 'fleetProof',
				title: 'A confiança de quem protege Tampa.',
				text: 'O mesmo padrão das frotas que cuidam de Tampa.',
			},
		],
		sealAlt: 'Selo I-CAR Gold Class Collision Repair',
	},

	renew: {
		text: 'Como se nada tivesse acontecido.',
		caption: 'Da batida até a entrega da chave.',
	},

	faq: {
		label: 'Perguntas',
		title: 'Perguntas frequentes',
		items: [
			{
				q: 'Como eu começo?',
				a: 'Manda um WhatsApp, a gente busca o carro{*} e cuida do claim. Você segue com o seu dia.',
			},
			{
				q: 'Preciso levar o carro até a oficina?',
				a: 'Não. Se o carro não anda, a gente busca.{*}',
			},
			{
				q: 'O que é um claim?',
				a: 'É o pedido aberto com a seguradora para cobrir o conserto. A gente abre por você e cuida da papelada.',
			},
			{
				flag: 'notYourFault',
				q: 'E se a batida não foi culpa minha?',
				a: 'O seguro do outro motorista pode pagar o seu conserto. Muita gente não sabe disso. A gente te ajuda com toda a papelada.',
			},
			{
				flag: 'costFaq',
				q: 'Quanto custa o conserto?',
				a: 'Cada batida é diferente. Por isso a gente primeiro avalia o dano na oficina.',
			},
			{
				q: 'Em que idiomas vocês atendem?',
				a: 'Português, espanhol e inglês. Você escolhe.',
			},
		],
	},

	final: {
		label: 'Bateu o carro? Comece aqui.',
		title: ['A gente devolve a chave.', 'E a tranquilidade.'],
	},

	footer: {
		contact: 'Contato',
		where: 'Onde',
		languages: 'Idiomas',
		spoken: 'Fala-se português',
		rights: 'Todos os direitos reservados.',
		top: 'Voltar ao topo',
	},
};
