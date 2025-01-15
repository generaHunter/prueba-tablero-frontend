export type TypeEnvironment = 'local' | 'development' | 'test' | 'production' | 'mocha' ;

export type TEnvironmentServer = {
    AppEnvironment: string | TypeEnvironment;

	// URIS API´s
	ApiTablero: string;
};
export type TAllEnvironment = TEnvironmentServer;