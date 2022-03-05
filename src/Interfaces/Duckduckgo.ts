export interface DuckduckgoResponse {
	Abstract: string
	AbstractSource: string
	AbstractText: string
	AbstractURL: string
	Answer: string
	AnswerType: string
	Definition: string
	DefinitionSource: string
	DefinitionURL: string
	Entity: string
	Heading: string
	Image: string
	ImageHeight: number
	ImageIsLogo: number
	ImageWidth: number
	Infobox: Infobox
	Redirect: string
	RelatedTopics: RelatedTopic[]
	Results: Result[]
	Type: string
	meta: Meta
}

export interface Infobox {
	content: Content[]
}

export interface Content {
	data_type: string
	label: string
	value: Value
	wiki_order: string
}

export interface Value {
	altitude?: null
	globe?: string
	latitude?: number
	longitude?: number
	precision?: number
	amount?: string
	unit?: string
	'entity-type'?: string
	id?: string
	'numeric-id'?: number
}

export interface RelatedTopic {
	FirstURL: string
	Icon: RelatedTopicIcon
	Result: string
	Text: string
}

export interface RelatedTopicIcon {
	Height: string
	URL: string
	Width: string
}

export interface Result {
	FirstURL: string
	Icon: ResultIcon
	Result: string
	Text: string
}

export interface ResultIcon {
	Height: number
	URL: string
	Width: number
}

export interface Meta {
	attribution: null
	blockgroup: null
	created_date: null
	description: string
	designer: null
	dev_date: null
	dev_milestone: string
	developer: Developer[]
	example_query: string
	id: string
	is_stackexchange: null
	js_callback_name: string
	live_date: null
	maintainer: Maintainer
	name: string
	perl_module: string
	producer: null
	production_state: string
	repo: string
	signal_from: string
	src_domain: string
	src_id: number
	src_name: string
	src_options: SrcOptions
	src_url: null
	status: string
	tab: string
	topic: string[]
	unsafe: number
}

export interface Developer {
	name: string
	type: string
	url: string
}

export interface Maintainer {
	github: string
}

export interface SrcOptions {
	directory: string
	is_fanon: number
	is_mediawiki: number
	is_wikipedia: number
	language: string
	min_abstract_length: string
	skip_abstract: number
	skip_abstract_paren: number
	skip_end: string
	skip_icon: number
	skip_image_name: number
	skip_qr: string
	source_skip: string
	src_info: string
}
