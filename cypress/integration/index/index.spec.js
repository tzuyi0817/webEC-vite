/// <reference types="cypress" />
const tabs = [];

describe('Index', () => {
  before(() => {
    cy.visit('/index');
  });

  it('輪播圖圖片檔名', () => {
    cy.get('.indexBanner').find('img').each((img, index) => {
      expect(img).to.have.attr('src', `${origin}/src/assets/banner${index + 1}.jpg`);
    });
  });

  it('檢查內文', () => {
    cy.get('section > strong').should('have.text', '都市人的餐酒坊');
    cy.get('section > p').should(
      'have.text',
      ` MuseClub是一間實體結合線上的餐酒館，在線上我們提供你南美莊園原豆、法國酒莊葡萄酒與台灣本地小農食材；在實體概念店我們用我們的食材做成精美的料理，並每周舉辦料理工作坊將異國的食材，與自己做料理，成為你的生活風格。 `
    );
  });

  it('類別標籤名稱', () => {
    cy.fixture('ajax.json').then(({ apiUrl, contentData }) => {
      cy.request(apiUrl + '/index').then(({ status, body: data }) => {
        const { categories } = data;
        expect(status).to.eq(200);

        cy.get('.navTabs > ul').children().each((li, index, collection) => {
          const { name, id } = categories[index];
          const button = li.find('button');
          tabs.push({ id, contentData: contentData[index] });

          index === 0 && expect(collection.length).to.eq(categories.length);
          expect(button).to.have.text(name);
        });
      });
    });
  });

  it('類別標籤互動', () => {
    tabs.forEach(({ id, contentData }, index) => {
      context('點擊標籤', () => {
        cy.get('.navTabs > ul > li > button').eq(index).click().should('have.class', 'navTabs__item navTabs__item--active');
        cy.get('.indexContent > p').should('have.text', contentData);
      });

      context('點擊圖片或文字導到各類別頁面', () => {
        cy.get('.indexContent > a').click();
        cy.location('pathname').should('eq', `/category/${id}`);
        cy.go(-1);
      });
    });
  });
});
