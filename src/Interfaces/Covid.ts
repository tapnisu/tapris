export interface CovidResponse {
	ID: string
	Message: string
	Global: Global
	Countries: Country[]
	Date: string
}

export interface Country {
	ID: string
	Country: string
	CountryCode: string
	Slug: string
	NewConfirmed: number
	TotalConfirmed: number
	NewDeaths: number
	TotalDeaths: number
	NewRecovered: number
	TotalRecovered: number
	Date: string
	Premium: unknown
}

export interface Global {
	NewConfirmed: number
	TotalConfirmed: number
	NewDeaths: number
	TotalDeaths: number
	NewRecovered: number
	TotalRecovered: number
	Date: string
}
