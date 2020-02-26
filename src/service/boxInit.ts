const BoxSDK = require('box-node-sdk')

const sdkConfigString = process.env.BOX_SDK_CONFIG || "{\"boxAppSettings\":{\"clientID\":\"umquh4z87swvddjnl7oj2q85618j1voo\",\"clientSecret\":\"6ADqgIXkUxMMqAVT97To73l7s8HECWI3\",\"appAuth\":{\"publicKeyID\":\"adpqr7pe\",\"privateKey\":\"-----BEGIN ENCRYPTED PRIVATE KEY-----\\nMIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIGWvBPGQbJR0CAggA\\nMBQGCCqGSIb3DQMHBAiFjzZv43mUaQSCBMiE6dOuXI0b\/oTqRoLoAuzOjtFUo+Rg\\nKXUJqveE9ZLGtOhuzkPsBDbbidihbqUzDDB98GAnngB8gtHc8M9ukw3cmQ+eb8se\\nYU0ecpm0eMYp7kLl0cffJMiys9omBjEwShfqWIRNlK+nuZFdW11fTqArk\/IFsxwL\\n8\/czhSF\/dIIRaniO1WG6A6F\/wwUwojJusKFghFKqxPslfrp6JbPJKhwy6\/xeLAwJ\\nqSc3OtqalAi\/rrncXYFJv6tNsCZ7PAOhQnifILkzynkv7OR2e5RKZ+lme8D7t5do\\nV8paS7Us0netJHuaYlJLoZMAXNjKp\/KneUDqlyru3oUEV4C\/UvogS0pWMJijwzP9\\nBbAGNgiYeS6whHq96BdMIbtp6s9gvdITsod0jw6NDCWj7F2sQ2TGzRVekpNp3Gff\\niWcyF2cXm25q8yAlKeWzwQSIXQ4BuURuoR0Z+jTDz\/ad9MlzwcG0bJGd9\/rMYkaW\\nIALU8MzR+5meYDEdtYGa2ldVmJvtJ4HB3ZgRTZsqkRCkuKYQNWNuuA0vwUbteCps\\nu+pFuHW1tk0awXAYZbHJR32sMbARBSIC0mRIU5tPMD4zw8RyVgv2BI\/voqo39GtS\\nr2WiejMfvS1tI0L1Dt5lzioUOExbykIF5dp5m98X4hWP2Li4eu\/+Wch3Jp1HnXeF\\nn74X1uI0KS4y+vLZ+rZD2isIvBmi4wBsbtzZev6jYxeVqTIdMgt7hveZTOIZUmdM\\nwxZew2yJPA+QgqNI8+KvqQlZPYWo5MulIxYHoC\/SlrNyx+e8NZcMByGYaHPAYyuG\\n\/WypF2q15PqVtGHwv5ZpiMt6oOs6F2mkksbI+sMkw7MzknSq\/doGnv3hQHrNk9NO\\nJb4liFljuEDguW\/Fkyp\/+aBrD5ulFbYD8NDSgMyg6DTGHn6\/6ZpMkBgN\/aT\/QzcW\\nqrtbv+\/Uxkf+O0PTE15uut6v\/JCy\/CPVB+XJSRkKEHe64oocDmoZGgJWNNAqOIRi\\ncpGdaym4x2trVVSf6HpghQfloPmoWtSgaOGK1btQH4iVyqfTOkjNqps1iQey\/lml\\nt6FCcrXQkDVbsEP\/JDFGLEA2VGuT+gwdgqedOma7vB5PmAReyx2ybW39hmsz52AB\\nOu5lpKB686U0K7Q\/OZGeevnV1Q+NUxrFlGdw\/F1iaP7bnLk\/uNWNOpjmbeTa3XMG\\nrrMnblv7gIQrHy0tpMxdPCJqqS8bSiBNGCmr72TxRsLeoF4w5jKyH22QtmcmgVl1\\nop5teUmqr7ZnRMjpOLoXGRIfGpYfRTdkJHNT8vyBaC+L5trtektOP6vtj\/i9G+vy\\nBKEk7GfExupdo845J8+EfTVKqgvbENJZAkji90IuKmkbFCMUGFk4qPnGl5WdDHxM\\naa4fFDotrAQM4DRS07dEzePrtV3hauiOP0OglCG+4wy2ERx88ZsNxorI6\/KBS9FL\\nrzjWR4+LAJBrElpC+qaY6LSO1Nu1WUyMAxE2yk5UnFt819T0fhybWnsMnn\/ns6xr\\nV8sPuQ7\/RCl\/O9LQlHLcHf\/7G9dLTBREH7rzvyKmHOo1ncZVE1BOHwN0IYo4TX33\\nFsckt9qQSKlmsqIp8o6jpgo19QXajOT1z360J7oCVOZg4KiSzss2CbR3JcwUIjDk\\nDn4=\\n-----END ENCRYPTED PRIVATE KEY-----\\n\",\"passphrase\":\"840f1b407a746afbd468b74127a08b5b\"}},\"enterpriseID\":\"100165368\"}"
const sdkConfig = JSON.parse(sdkConfigString)

class SDKConfiguration {
    sdk = BoxSDK.getPreconfiguredInstance(sdkConfig)
}

export default SDKConfiguration



