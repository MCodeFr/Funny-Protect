module.exports = {
	token: "", //le token de ton bot
    prefix: "", //ton préfix
	owner: {
			id: "", //ton id
			name: "" //ton pseudo avec le #
		},
	support: {
		serverlink: '' //Le lien de ton serveur de support
	},
    status: [
		{
			name: `prefix-help`,
			type: "PLAYING"
		},
		{
			name: "{serversCount} serveurs et {usersCount} utilisateurs | {version}",
			type: "WATCHING"
		},

	]

};
