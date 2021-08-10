'use strict'

const breweryData = [
  {
    name: '4th Meridian Brewing',
    type: null,
    active: true,
    street_address: '2626 50 Ave unit 6',
    province: 'Alberta',
    city: 'Lloydminster',
    postal_code: 'T9V 2S3',
    country: 'Canada',
    longitude: '53.26171289248832',
    latitude: '-110.00745967405508',
    phone: '+17805229998',
    website: 'http://www.4thmeridianbrewing.com/',
    description: 'Three friends who dreamed of owning their own brewery... stop me if you\'ve heard this one before. Our story is all about the brew.',
    logo_url: 'https://static.wixstatic.com/media/91fb41_969958b37f164c2d944bd9a6f0210cf2~mv2.png/v1/fill/w_141,h_122,al_c,q_85,usm_0.66_1.00_0.01/4M-round-logo-font-NO-circle-bold-font-F.webp',
    established: '2017',
    social1: null,
    social2: null,
    social3: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Breweries', breweryData, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Breweries', null, {})
  }
}
