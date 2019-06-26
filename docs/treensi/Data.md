# Состав TreeNSI

Данные TreeNSI можно разбить на несколько категорий:

[Локализация.](#локаnизация)

Поддержка локализации представления данных в TreeNSI осуществляется через дополнительные таблицы, содержащие написание отдельных реквизитов справочников на языках, отличных от основного языка ведения БД.

[Нормативные данные.](#нормативные-данные)

Справочники данной категории содержат информацию о редко изменяемых сущностях, которые, в определенном смысле, можно считать постоянными. Эти сущности широко используются в составе иных справочников и документов, однако обычно в бухгалтерском учете разрез по ним в отдельные задачи не выделяется. Данные для справочников взяты из нормативных законодательных актов или государственных стандартов, однако в большинстве  своем все данные нормализированы с международными актами и соглашениями. Изменения в подобных справочниках производятся только при наличии изменений в источнике. Удаление данных не допускается (для сокрытия данных используется флаг актуальности).

[Классификаторы.](#кnассификаторы)

Классификация материальных ценностей, товаров и услуг служит для различных целей, направленных на разделение огромной имеющейся номенклатуры на отдельные группы, состав которой определяется по схожим свойствам их элементов, что позволяет оперировать ими как единым товаром или услугой. В зависимости от целей классификации степень детализации групп различна. Утверждаются классификаторы, как на уровне государства, так и международными соглашениями.

[Данные ОСЖД.](#данные-осжд)

Организация содружества железных дорог (ОСЖД) предоставляет ряд справочно-нормативной информации, описывающей железнодорожные грузоперевозки.

## Локализация

Для описания различных национальных языков используется специальный справочник.
<TableName name='NationalLanguage'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** средний уровень.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
| IdLanguage | INT not null | Идентификатор | <Key/> |
| Name | VARCHAR (30) not null | Наименование | |
| LanguageTag | VARCHAR (10) null | Акроним (формата ru-RU, en-US) ISO 639 | |

::: tip
Данные можно получить, например, здесь: <http://www.localeplanet.com/icu/iso639.html>.
:::

## Нормативные данные

### Страны и территории мира

<TableName name='Country'></TableName>
<HandbookType is-simply></HandbookType>

**Доступ:** высокий уровень.

**Источник**: ОКРБ 017-99.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
| IdCountry | INT not null | Идентификатор | <Key/> |
| Code | CHAR (3) not null | Цифровой код |  |
| IsActive | BIT not null | Активно |  |

#### Периодические данные

Характеристика элемента справочника Страны

<TableName name='CountryProperty'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
| IdProperty | INT not null | Идентификатор | <Key/> |
| IdElement | INT not null | Идентификатор страны (Country) | |
| BeginDate | DATE not null | Дата начала действия | |
| Name | VARCHAR (100) not null | Наименование | |
| FullName | VARCHAR (100) null | Полное наименование | |
| Alfa2Code | CHAR (2) not null | Буквенный код альфа-2 | |
| Alfa3Code | CHAR (3) not null | Буквенный код альфа-3 | |
| IsOffshoreArea | BIT not null | Это офшорная зона | |

#### Локализация данных

Наименование стран мира на различных языках

<TableName name='CountryNationalData'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
| IdCountryNationalData | INT not null | Идентификатор | <Key/> |
| IdCountry | INT not null | Идентификатор страны (Country) |  |
| IdLanguage | INT not null | Идентификатор национального языка (NationalLanguage) |  |
| FullName | NVARCHAR (100) not null | Полное наименование на национальном языке |  |
| BeginDate | DATE not null | Дата начала действия |  |
| IsActive | BIT not null | Активно | |

### Союзы и объединения стран

Геополитические объединения стран

<TableName name='CountryUnion'></TableName>
<HandbookType is-simply></HandbookType>

**Доступ:** средний уровень.

**Источник**: Википедия.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdCountryUnion | INT not null | Идентификатор | <Key/> |
|Name | VARCHAR (50) not null | Наименование |  |
|FullName | VARCHAR (200) null | Полное наименование |  |
|IsActive | BIT not null | Актуально |  |

#### Периодические данные

Состав геополитических объединений стран

<TableName name='CountryUnionMember'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdCountryUnionMember | INT not null | Идентификатор записи | <Key/> |
|IdCountryUnion | INT not null | Идентификатор объединения (CountryUnion) |  |
|IdCountry | INT not null | Идентификатор страны (Country) |  |
|BeginDate | DATE null | Дата начала участия |  |
|EndDate | DATE null | Дата завершения участия |  |

### Валюты

<TableName name='Currency'></TableName>
<HandbookType is-simply></HandbookType>

**Доступ:** высокий уровень.

**Источник**: ОКРБ 016-99.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdCurrency | INT not null | Идентификатор | <Key/> |
|Code | CHAR (3) not null | Цифровой код |  |
|AlfaCode | CHAR (3) not null | Буквенный код |  |
|IsActive | BIT not null | Активно |  |

#### Периодические данные

Характеристика валюты

<TableName name='CurrencyProperty'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdProperty | INT not null | Идентификатор | <Key/> |
|IdElement | INT not null | Идентификатор валюты (Currency)|  |
|BeginDate | DATE not null | Дата начала действия |  |
|Name | VARCHAR (100) not null | Наименование |  |

### Единицы измерения

<TableName name='MeasurementUnit'></TableName>
<HandbookType is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: ОКРБ 008-95.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdMeasurementUnit | INT not null | Идентификатор | <Key/> |
|IsGroup | BIT not null | Флаг группы |  |
|ParentId | INT null | Идентификатор группы (MeasurementUnit) |  |
|Name | VARCHAR (100) not null | Наименование |  |
|Description | NVARCHAR (200) null | Описание |  |
|InternationalCode | CHAR (3) null | Международный код |  |
|DomesticCode | CHAR (3) null | Национальный код |  |
|DomesticIdentificationCode | NVARCHAR (30) not null | Национальное условное обозначение |  |
|InternationalIdentificationCode | NVARCHAR (30) null | Международное условное обозначение |  |
|DomesticSymbolCode | VARCHAR (50) null | Национальное кодовое буквенное обозначение |  |
|InternationalSymbolCode | VARCHAR (10) null | Международное кодовое буквенное обозначение |  |
|IsActive | BIT not null | Активно |  |

## Классификаторы

### Классификатор ОКРБ

#### Укрупненная структура классификатора продукции по видам экономической деятельности ОКРБ 007-2012

<TableName name='EconomicActivityProductsClassificationType'></TableName>
<HandbookType is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: ОКРБ 007-2012.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdClassType | INT not null | Идентификатор | <Key/> |
|IsGroup | BIT not null | Флаг группы |  |
|ParentId | INT null | Идентификатор родителя (EconomicActivityProductsClassificationType) |  |
|Code | VARCHAR (2) null | Код по классификатору ОКРБ | |
|Name | VARCHAR (200) not null | Наименование |  |

#### Классификатор продукции по видам экономической деятельности ОКРБ 007-2012

<TableName name='EconomicActivityProductsClassification'></TableName>
<HandbookType is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: ОКРБ 007-2012.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdClassProduct | INT not null | Идентификатор | <Key/> |
|IdClassType | INT not null | Секция (подсекция) классификатора (EconomicActivityProductsClassificationType) |  |
|IsGroup | BIT not null | Флаг группы |  |
|ParentId | INT null | Идентификатор родителя (EconomicActivityProductsClassification) |  |
|Code | VARCHAR (12) null | Код по классификатору ОКРБ |  |
|Name | VARCHAR (550) not null | Наименование |  |

### ТН ВЭД

#### Единый таможенный тариф Евразийского экономического союза

<TableName name='EAEUCommonCustomsTariff'></TableName>
<HandbookType is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: [Евразийская экономическая комиссия](http://www.eurasiancommission.org/ru/act/trade/catr/ett/Pages/default.aspx).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdCommonCustomsTariff | INT not null | Идентификатор | <Key/> |
|IsGroup | BIT not null | Флаг группы |  |
|ParentId | INT null | Идентификатор родителя (EAEUCommonCustomsTariff) |  |
|Code | VARCHAR (15) null | Код ТН ВЭД |  |
|Name | VARCHAR (1000) not null | Наименование |  |
|AdditionalMeasurementUnit | VARCHAR (20) null | Доп. ед. изм. |  |
|DutyRate | VARCHAR (70) null | Ставка ввозной таможенной пошлины |  |
|IsActive | BIT not null | Активно |  |

### ГНГ

#### Гармонизированная номенклатура грузов

<TableName name='CargoesHarmonizedNomenclature'></TableName>
<HandbookType is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: [Организация содружества железных дорог (ОСЖД)](http://www.osjd.org/doco/public/ru?STRUCTURE_ID=5034&layer_id=6073&refererLayerId=6076&refererPageId=6024&id=1122).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdCargoesHarmonizedNomenclature | INT not null | Идентификатор | <Key/> |
|IsGroup | BIT not null | Флаг группы |  |
|ParentId | INT null | Идентификатор родителя(CargoesHarmonizedNomenclature) |  |
|Code | VARCHAR (8) null | Код ГНГ |  |
|Name | VARCHAR (850) not null | Наименование |  |
|IsActive | BIT not null | Активно |  |

### ЕТ СНГ

#### Единая тарифно-статистическая номенклатура грузов

<TableName name='CargoesHarmonizedNomenclature'></TableName>
<HandbookType is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: [Жедезная дорога](http://cargo.rzd.ru/etsng/public/ru?STRUCTURE_ID=5103).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdTransportRateClass | INT not null | Идентификатор | <Key/> |
|IsGroup | BIT not null | Флаг группы |  |
|ParentId | INT null | Идентификатор родителя (TransportRateClass) |  |
|Code | VARCHAR (6) null | Код ЕТСНГ |  |
|Name | VARCHAR (400) not null | Наименование |  |
|Class | INT null | Тарифный класс груза |  |
|IsActive | BIT not null | Активно |  |

## Данные ОСЖД

### Страны участницы 

<TableName name='RailwayCountry'></TableName>
<HandbookType is-simply></HandbookType>

**Доступ:** высокий уровень.

**Источник**: **Источник**: [Международный союз железных дорог (МСЖД)](https://uic.org/country-codes).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRailwayCountry | INT not null | Идентификатор | <Key/> |
|ContinentCode | INT not null | Код континента |  |
|Code | CHAR (2) not null | Железнодорожный код страны | |
|IdCountry | INT not null | Идентификатор страны (Country) |  |
|IsActive | BIT not null | Активно |  |

#### Периодические данные

Описание страны участницы ОСЖД

<TableName name='RailwayCountryProperty'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdProperty | INT not null | Идентификатор | <Key/> |
|IdElement | INT not null | Идентификатор страны участницы ОСЖД (RailwayCountry) |  |
|BeginDate | DATE not null | Дата начала действия |  |
|RICS | CHAR (4) null | Код железнодорожного предприятия |  |
|RailwayShortName | VARCHAR (20) not null | Сокращенное наименование железной дороги на русском языке |  |
|RailwayFullName | VARCHAR (100) null | Полное наименование железной дороги на русском языке |  |
|RailwayShortNameTranslit | NVARCHAR (20) null | Сокращенное наименование железной дороги на латыни |  |

### Железнодорожные предприятия

<TableName name='RailwayCompany'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: [Международный союз железных дорог (МСЖД)](https://uic.org/rics).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRailwayCompany | INT not null | Идентификатор записи | <Key/> |
|IdCountry | INT not null | Идентификатор страны (Country) |  |
|CodeRICS | VARCHAR (4) null | Код RICS |  |
|ShortName | NVARCHAR (50) null | Сокращенное наименование |  |
|FullName | NVARCHAR (250) null | Полное наименование |  |
|IsRWAdministation | BIT not null | ЖД администрация |  |
|IsActive | BIT not null | Активно |  |

#### Транслитерация

Железнодорожные предприятия (транслитерация)

<TableName name='RailwayCompanyTranslitName'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRailwayCompany | INT not null | Идентификатор предприятия (RailwayCompany) | <Key/> |
|ShortName | NVARCHAR (50) null | Сокращенное наименование |  |
|FullName | NVARCHAR (250) null | Полное наименование |  |

#### Управляющие инфраструктурой ЖД предприятия

<TableName name='RailwayAdministration'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRailwayCompany | INT not null | Идентификатор предприятия (RailwayCompany) | <Key/> |
|ShortName | NVARCHAR (50) null | Сокращенное наименование |  |
|FullName | NVARCHAR (250) null | Полное наименование |  |

### Грузовые ЖД станции

<TableName name='RailwayStantion'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: [Грузовой портал Организации сотрудничества железных дорог](http://osjd.ctm.ru/search/documents?q=%D0%9F%D0%B5%D1%80%D0%B5%D1%87%D0%B5%D0%BD%D1%8C%20%D0%B3%D1%80%D1%83%D0%B7%D0%BE%D0%B2%D1%8B%D1%85%20%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%B9).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
IdRailwayStantion | INT not null | Идентификатор | <Key/> |
IdRailwayCountry | INT not null | Идентификатор страны ЖД (RailwayCountry) |  |
Code | CHAR (6) null | Код станции |  |
Name | NVARCHAR (100) not null | Наименование |  |
BorderPointCode | VARCHAR (4) null | Код пограничного перехода |  |
IsActive | BIT not null | Активно |  |

#### Транслитерация

ЖД станции, транслитерация названий

<TableName name='RailwayStantionTranslit'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRailwayStantion | INT not null | Идентификатор станции (RailwayStantion) | <Key/> |
|NameTranslit | NVARCHAR (100) null | Название станции на латыни (транслитерация) |  |

#### Локализация данных

Название ЖД станций на различных языках

<TableName name='RailwayStantionNationalData'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdStantionNationalData | INT not null | Идентификатор | <Key/> |
|IdRailwayStantion | INT not null | Идентификатор станции (RailwayStantion) |  |
|IdLanguage | INT not null | Идентификатор национального языка (NationalLanguage) |  |
|Name | NVARCHAR (100) not null | Название на национальном языке |  |
|IsActive | BIT not null | Активно |  |

### Пограничные пункты

#### Пограничные и переходные пункты

<TableName name='RailwayBorderPoint'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: [Международный союз железных дорог (МСЖД)](https://uic.org/border-points).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRailwayBorderPoint | INT not null | Идентификатор | <Key/> |
|Code | CHAR (4) null | Код перехода |  |
|BorderPointType | INT null | Тип перехода (2-жд,3-порт,4-паром) |  |
|IsActive | BIT not null | Активно |  |

#### Станции пограничных и переходных пунктов

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRailwayBorderPoint | INT not null | Идентификатор пункта (RailwayBorderPoint) | <Key/> |
|IdRailwayStantion | INT not null | Идентификатор ЖД станции (RailwayStantion) | <Key/> |
|IsActive | BIT not null | Активно |  |
