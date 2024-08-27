require("dotenv").config();
const mongoose = require('mongoose');
const imageService = require('./services/imageService');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err))


// dummyData
const imageDatas = [
  {
    "name": "bar1",
    "url": "https://s3-alpha-sig.figma.com/img/77f7/4793/e63f84f84cd5f1a5106c2d6fc53da198?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2mzzExflgFNDdwLmXPVx5dH00DbL093dK1bwEwEVSK5H1GmTblCvOR39zH9obSTisKJHy6vUdk~ErFE~cv4Bj0ysqixYFYo8huPOG~ns~wWUmGW~rriBoYaXfTGmcjW9rBDK1uMzLY0BEb5xkK3POZ2kC2Deie88si~UzTN7Ub9KAAhfDfGaKqUoqa7FFs6FGWbSfCExyj-kzFA7FbDiilVBWY1tL0otTA-cGa24rKndfrc8gJiZfTVVXky-NNl8M8KLy3GPEfmJETtilqQdGqVZ0L1l9TKd5zjJBipk1VwE5UvdUlVpbOeEtyTymFv7bQTrpV1iUaJq3E4gr8Nfw__",
    "tags": []
  },
  {
    "name": "bar2",
    "url": "https://s3-alpha-sig.figma.com/img/c517/1378/146026d911dfe84a5854def2cf07c71a?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Tan-~bhrQ3tWtovzrgTLvFNrKyXSexxMXrPVjL1fD-adOzHJQcCLvZH9O0Xz-6CnKdRjB4xfxgiOIl38Gc7k1yGaoWtiaqAUSZgYxHxDut3es1KBaFO~XzjQc8x09JDjRDdlZKukV40QAFUnOa7Iso~brF93-dv33Iu523dxcB8CIHnRe6-6zNswjj1ILeBLIFpeyvlLbjjC2KiQfa~Not6V1H2LqGQ6-SaxflCF5pJDm3na9WEamXZlrywHFjQWS2OLUEPtkqdBhCKks8km5hJzxLLpIglToyt~64kzq4ymSsJbGwYyUUPwVgw7qCxwdM4z9ADcS7eoC2uPYgnFSw__",
    "tags": []
  },
  {
    "name": "cups1",
    "url": "https://s3-alpha-sig.figma.com/img/57dd/08c9/ac678a797432e05d189b559e68beada6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aomjBeewNvAeOFSvGbQsuVzdNLpAttgcvCguLi4sZeTejmmlul4DP31t8ociHbETjwcyaWtYig-QRtPCt5iZRT821aW7VaVV2h4iikDVWfVnuJDCOS~BzBm~2GHRlErcX5nDfBGZ5Y~rrn23QDe7xT0Pjl0dDRo6vNoHhX7CWJQvl-kgrsLMJORXyvC9yMYKvFH07z1tpBP49ouAXha8c3lVx9SA0OtpwJ6R3iZt7cx~rRrx886wNubz~Z2k~6ZFOBEubak-lQUdZodfzoqpomGKemdpKHKhZJHud6YLeuZ0JLcv~PUB1oNU6d9kKGL~WzFLpzTXBoWhrH9-c3hBdQ__",
    "tags": []
  },
  {
    "name": "cups2",
    "url": "https://s3-alpha-sig.figma.com/img/3ecf/1c28/0a5bd57e115194281fc0d8107bda8e5c?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eBSmFUtYMRep8qb~FeUJewltBFZ8uD5dvG4oKyrjjgHSPgLunimrTsstEFSPdBbNk1V94xgg1CnjiOu2NdSdXFY1s0zezc9NzNHLpOPCIBpjvEQHah~Qh~BE~XW6wrvs1JHM7H4mk~OY5D-tzSvEGK4NlHGTp8wjz8w6XORele0-CjR9yt8JkkpQlSqZLHJGz2UREDRUVz2DA7xY58muIxLess-xgQJ7dho4~nq6590GvswryF3UMqI4UcvZBUpenNqkDatjH1oGFJpCcz2UChCs2atsGEYKIOqpZlOp6z3G4iIrd6sRiXPI6iHqH52kBE1aJVPdqAxXpbmv73MlNg__",
    "tags": []
  },
  {
    "name": "backyard",
    "url": "https://s3-alpha-sig.figma.com/img/7689/bfc9/7d5cc823c98ca47acb499ccfdfb546c6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A6Y~U0l1w0IjIT~45Ir649yzCZ~76ADD-ZHhAliHqnMC7aN7ikLyDFzDLdPhWAx950y0GVSG0lgjIRarFyLLsfcP9VAM0TgAwbq64zujBDV8uG0pIRtXWO1UtSI4NgSOfR1qirFD4Pm213bMpPHAkcF5njADm9DiEqP1PLUAz0T8zq5bm6-LpClZWjhROGmvUT~Mf27WL6rbXQ~kyN2QCGTOdFnoLxbp9J8p-mmTRwfg5d9c1xjPLDWxTJuOmOVIVmyVPqZZ3XDK9QwjLWLi9qc-zI6UXBhRbQ5IZam1WyvSkEcol7OgG7e1ViermtJVDDQtAFLhlKdLjQt-AXBh8A__",
    "tags": []
  },
  {
    "name": "storefront",
    "url": "https://s3-alpha-sig.figma.com/img/09d5/b49b/cf9d204b8f418a2baa318144fe56955d?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=klwUgsxQsWvSx2awQMhSopHcrHPwIxLmjYu~ZTEPzKbMtu40Sm3e5OdJ5X-qaI9C8yF6qlZ-R1R3zguCq-IAKLmPT51zldoNhDLqnz13DA60-h0tGQdWBBLo6UcF9InFYas4K8dW32rQPy5qWu-UGcJKKLOyjzI4K5K8H-S5XtPumfBKRo8~Z~6~Uzypj7VShRuXAqikamnsAQ64WK9hyRcLOIAgV63Lb-1qkihpNhOPpfRl8Z7tqSu5TO~mRtap4nGuPzy59~dBk-PcDlliHC53kj9CquhYTNdgeCZMGVIdAZEe9opjBXylrwgmB9UTP7U1kmRkFH0Sj~KgO8gE0w__",
    "tags": []
  },
]

// imageDatas.map((item) => imageService.createImage(item));

imageService.getImageByName('bar1')

