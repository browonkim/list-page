// https://docs.cypress.io/api/table-of-contents

const {mockData} = require("@/mockup/mock-data");
describe('List-view Test', () => {
    // before(() => {
    //   cy.clearLocalStorage()
    // })
    const title = 'hello'
    const tag = 'hi bye good no'
    const description = 'asdfjl jellejrgjgof igoletro;g qniroenlgen;rjlds;fk berqgfdl;k jb;foldg s'
    it('add item', () => {
        cy.visit('/')
        cy.contains('h1', 'Law&Good List')
        cy.contains('button', 'Add')
        cy.get('.add-item-button').click()
        cy.get('input.input-title').type(title)
        cy.get('input.input-tag').type(tag)
        cy.get('textarea.input-description').type(description)
        cy.get('button.confirm-button').click().should(
            () => {
                const data = localStorage.getItem('data')
                if (!data) {
                    throw new Error('localStorage error')
                }
                const listItem = JSON.parse(data)
                const result = listItem.find((item) => item.title == title && item.description == description)
                if (!(result.title == title && result.description == description)) {
                    throw new Error('add item has failed')
                }
            }
        )
    })
    it('update item', () => {
        cy.get('div.item-card-container').first()
            .contains(title).get('button.edit-button').first().click()
            .get('input.input-title').type(`{backspace}{backspace}{backspace}{backspace}`)
        cy.get('button.confirm-button').click()
        cy.reload()
    })
    it('delete item', () => {
        cy.get('div.item-card-container').first()
            .contains('h').get('button.delete-button').first().click()
            .get('.delete-confirm button.delete-button').click()
        cy.reload()
        cy.get('div.item-card-container').first()
            .contains(mockData[0].title)
    })
    after(() => {
        cy.clearLocalStorage()
    })
})
