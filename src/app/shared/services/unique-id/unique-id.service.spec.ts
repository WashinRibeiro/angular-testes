import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {
  // Um das diretirizes do teste é que não tenha estado compartilhado entre os testes,
  // pois antes de cada teste o estado deve ser zerado, para isso utilizamos o beforeEach,
  // que é uma função que é chamada antes de cada teste (it)
  let service: UniqueIdService = null;
  beforeEach(() => {
    service = new UniqueIdService();
  });

  // No it, o padrão de chamada é "alguma coisa DEVE fazer alguma coisa QUANDO alguma coisa acontecer"
  it(`#${UniqueIdService.prototype.generatedUniqueIdWithPrefix.name} 
    DEVE gerar id QUANDO chamado com prefixo`, () => {
    const id = service.generatedUniqueIdWithPrefix("app");
    // expect(id).toContain('app-'); // Precisão simples
    expect(id.startsWith("app-")).toBeTrue(); // Precisão mais complexa

    expect(true).toBeTrue(); // Funciona somente com o tipo literal true
    expect(true).toBe(true); // Funciona somente quando o valor da expectativa é igual ao da comparação, 
    expect(true).toBeTruthy(); // Funciona com qualquer valor que seja avaliado como true (1, true, 'a')
  });

  it(`#${UniqueIdService.prototype.generatedUniqueIdWithPrefix.name} 
    NÃO DEVE gerar ids duplicado QUANDO chamado várias vezes`, () => {
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generatedUniqueIdWithPrefix("app"));
    }
    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} 
    DEVE retornar o número de ids gerados QUANDO chamado`, () => {
    service.generatedUniqueIdWithPrefix("app");
    service.generatedUniqueIdWithPrefix("app");
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  // Nesse texto utilizamos o withContext() para que o teste seja 
  // mais descritivo qual dos valores está fazendo o teste falhar
  it(`#${UniqueIdService.prototype.generatedUniqueIdWithPrefix.name}       
    DEVE lançar erro QUANDO chamado com prefixo vazio`, () => {
    const emptyValues = [null, undefined, "", "0", "1"];
    emptyValues.forEach((emptyValue) => {
      expect(() => service.generatedUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value: ${emptyValue}`)
        .toThrow();
    });
  });
});
