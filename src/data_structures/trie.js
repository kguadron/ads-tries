class TrieNode {
  constructor() {
    this.words = [];
    this.children = {};
  }
}

class Trie {
  constructor(words, buildCode, Node=TrieNode) {
    this.Node = Node;
    this.buildCode = buildCode;
    this._root = new this.Node();
    this._count = 0; // number of records/words
    words.forEach(word => this.addWord(word));
  }

  addWord(word) {
    const code = this.buildCode(word);
    let node = this._root;

    for (let radix of code) {
      if (node.children[radix] === undefined) {
        node.children[radix] = new TrieNode();
      }
      node = node.children[radix];
    }

    if (!node.words.includes(word)) {
      node.words.push(word);
      this._count += 1;
    }
  }

  lookupCode(code) {
    let node = this._root;

    for (let radix of code) {
      node = node.children[radix];

      if (node === undefined) { return [];}
    }
    return node.words;
  }

  getAllWords(node, output) {
    for (let word of node.words) {
      output.push(word);
    }

    let children = node.children;

    for (let key of Object.keys(children)) {
      this.getAllWords(children[key], output)
    }

    return output
  }

  lookupPrefix(codePrefix) {
    let node = this._root;
    let output = []

    for (let radix of codePrefix) {
      node = node.children[radix];

      if (node === undefined) {
        return [];
      }
    }

    let wordMatches = this.getAllWords(node, output)

    return wordMatches;
  }

  count() {
    return this._count;
  }
}

export default Trie;