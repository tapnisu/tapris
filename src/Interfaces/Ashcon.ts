export interface AshconResponse {
	uuid: string
	username: string
	username_history: UsernameHistory[]
	textures: Textures
	created_at: string
}

export interface Textures {
	custom: boolean
	slim: boolean
	skin: Skin
	raw: Raw
}

export interface Raw {
	value: string
	signature: string
}

export interface Skin {
	url: string
	data: string
}

export interface UsernameHistory {
	username: string
	changed_at?: string
}
