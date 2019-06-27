# Состав TreeNSI

Данные TreeNSI можно разбить на несколько категорий:

[Локализация.](#локаnизация)

Поддержка локализации представления данных в TreeNSI осуществляется через дополнительные таблицы, содержащие написание отдельных реквизитов справочников на языках, отличных от основного языка ведения БД.

::: tip
В справочниках населенных пунктов часто встречаются записи об одном и том же городе, но на разных языках (напрмер "Лондон" и "London"). Так делать нельзя. Лучше в основной таблице назвать населенный пункт на основном языке пользователя (для удобства самого пользователя), а наименование на иностранном языке вынести в отдельную таблицу. Конкретная задача, использующая данные об населенном пункте, должна сама решать, какие данные использовать: данные на основном языке или данные на иностранном языке.
:::

[Нормативные данные.](#нормативные-данные)

Справочники данной категории содержат информацию о редко изменяемых сущностях, которые, в определенном смысле, можно считать постоянными. Эти сущности широко используются в составе иных справочников и документов, однако обычно в бухгалтерском учете разрез по ним в отдельные задачи не выделяется. Данные для справочников взяты из нормативных законодательных актов или государственных стандартов, однако в большинстве  своем все данные нормализированы с международными актами и соглашениями. Изменения в подобных справочниках производятся только при наличии изменений в источнике. Удаление данных не допускается (для сокрытия данных используется флаг актуальности).

[Классификаторы.](#кnассификаторы)

Классификация материальных ценностей, товаров и услуг служит для различных целей, направленных на разделение огромной имеющейся номенклатуры на отдельные группы, состав которой определяется по схожим свойствам их элементов, что позволяет оперировать ими как единым товаром или услугой. В зависимости от целей классификации степень детализации групп различна. Утверждаются классификаторы, как на уровне государства, так и международными соглашениями.

[Данные ОСЖД.](#данные-осжд)

Организация содружества железных дорог (ОСЖД) предоставляет ряд справочно-нормативной информации, описывающей железнодорожные грузоперевозки.

[Правила перевозки опасных грузов](#правиnа-перевозки-опасных-грузов)

Для оформления документов по перевозки ядовитых, токсичных или пажаро- взровоопасных грузов (особенно железнодорожным транспортом) часто требуются данные, характеризующие способы трансортировки, хранения, маркировки и упаковки грузов. Подобные данные описаны спрециальных правилах перевозки опасных грузов, составленных как на госуданственном, так и на международном уровне.

[Подсистема хранения адресов](#подсистема-хранения-адресов)

В рамках TreeNSI под адресом подразумевается однозначное описание географического расположения какого-либо объекта. Юридический адрес предприятия, пункт разгрузки и прописка физического лица – все это единая сущность. Существует много способов хранения подобной информации (например, непосредственно в документах), однако в TreeNSI для хранения адресов организована отдельная подсистема. Основной принцип хранения адресных данных заключается в разбиении адреса на несколько частей:

1. Страна расположения объекта
2. Административно территориальная единица (`АТЕ`) наименьшего уровня, на территории которой располагается объект
3. Описание расположения объекта в пределах `АТЕ`
4. Уточняющие данные о расположении

Привязка к `АТЕ` позволяет обойти проблему описания всех имеющихся для отдельной страны уровней административно территориального деления  (для разных стран оно разное), данные о самих `АТЕ` размещены в отдельный иерархичный справочник, где и определено вхождение одной `АТЕ` в состав другой `АТЕ`. Такая структура позволяет использовать национальные классификаторы `АТЕ` (`КЛАДР`, `САТАО РБ` и т.д.).

При использовании адресов в документах и прочих справочниках, используются лишь `ID` записей справочника адресов, так что один и тот же адрес можно использовать в разных объектах. При этом, для адреса можно указать его тип (юридический адрес, почтовый, адрес разгрузки и т.д.), что позволяет с помощью специальных методов корректно формировать представление адреса в пользовательском интерфейсе или на печати (для пункта разгрузки указание почтового индекса бессмысленно, тогда как для почтового адреса это существенно).

[Национальные классификаторы АТЕ](#национаnьные-кnассификаторы-ате)

В каждой стране существует свой классификатор `АТЕ`. Использование этих классификаторов значительно упрощает пользователю ввод и редактрование данных, а также позволяет наладить контроль за правильностью ввода адресов.

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

**Источник**: [Международный союз железных дорог (МСЖД)](https://uic.org/country-codes).

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

## Правила перевозки опасных грузов

### Правила перевозки опасных грузов железнодорожным транспортом (Соглашение о международном железнодорожном сообщении СМГС)

<TableName name='RailwayDangerousGoodsRegulation'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: [Организация Сотрудничества Железных Дорог (ОСЖД)](www.osjd.org/).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRailwayDG |INT not null |Идентификатор |<Key/> |
|UNCode |CHAR (4) not null |Код опасности ООН | |
|Name |VARCHAR (600) not null |Наименование вещества | |
|Class |VARCHAR (10) null |Класс опасности | |
|ClassificationCode |VARCHAR (15) null |Классификационный код | |
|PackingGroup |VARCHAR (3) null |Группа упаковки | |
|DangerSing |VARCHAR (15) null |Знак опасности | |
|SpecialProvision |VARCHAR (30) null |Специальные положения | |
|LimitedQuantity |VARCHAR (20) null |Ограниченные количества | |
|ExceptedQuantity |CHAR (2) null |Освобожденные количества | |
|PackingInstruction |VARCHAR (25) null |Инструкции по упаковке | |
|PackingSpecialProvision |VARCHAR (30) null |Специальные положения по упаковке | |
|CommonPackingProvision |VARCHAR (15) null |Положения по совместной упаковке | |
|PortableTankInstruction |VARCHAR (15) null |Инструкция по переносной цистерне (контейнера для груза навалом) | |
|PortableTankSpecialProvision |VARCHAR (20) null |Специальные положения по переносной цистерне (контейнера для груза навалом) | |
|TankWagonCode |VARCHAR (30) null |Код цистерны | |
|TankWagonSpecialProvision |VARCHAR (60) null |Специальные положения по цистерне | |
|TransportCategory |INT null |Транспортная категория | |
|CargoItemSpecialProvision |VARCHAR (10) null |Специальные положения по перевозке грузовых мест | |
|BulkCarriageSpecialProvision |VARCHAR (10) null |Специальные положения по перевозке навалом | |
|CargoOperationsSpecialProvision |VARCHAR (50) null |Специальные положения по погрузке-разгрузке | |
|HazarCode |VARCHAR (5) null |Код опасности | |
|EmergencyCardNumber |CHAR (3) null |Номер аварийной карточки |
|MinimalCoverRate |VARCHAR (30) null |Минимальные нормы прикрытия | |
|HumpYardCondition |VARCHAR (10) null |Условия пропуска с сортировочной горки | |
|Description |VARCHAR (100) null |Пояснение | |
|IsActive |BIT not null |Активно | |

### Перевозка ЖД транспортом по территории РБ

<TableName name='RBRailwayDangerousGoodsRegulation'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: Правила по обеспечению безопасности перевозки опасных грузов железнодорожным транспортом по территории Республики Беларусь (МЧС 28.12.2012 №73).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRBRailwayDG |INT not null |Идентификатор |<Key/> |
|UNCode |CHAR (4) not null |Код опасности ООН | |
|Name |VARCHAR (400) not null |Наименование вещества | |
|Description |VARCHAR (400) null |Пояснение | |
|EmergencyCardNumber |CHAR (3) null |Номер аварийной карточки | |
|ClassificationCode |VARCHAR (20) null |Классификационный код | |
|HazarClass |VARCHAR (10) null |Класс опасности | |
|HazarCategoryNumber |INT null |Номер категории опасности | |
|BasicDangerSingNumber |VARCHAR (15) null |Номер основного знака опасности | |
|AdditionalDangerSingNumber |VARCHAR (15) null |Номер дополнительного знака опасности | |
|IsActive |BIT not null |Активно | |

### Перевозка автотранспортом

<TableName name='RoadDangerousGoodsRegulation'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

**Источник**: Правила по обеспечению безопасности перевозки опасных грузов автомобильным транспортом в Республике Беларусь (Пост. МЧС от 08.12.2010 N 61).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdRoadDG |INT not null |Идентификатор |<Key/> |
|UNCode |CHAR (4) not null |Код опасности ООН | |
|Name |VARCHAR (500) not null |Наименование и пояснение | |
|Class |VARCHAR (10) null |Класс опасности | |
|ClassificationCode |VARCHAR (15) null |Классификационный код | |
|PackingGroup |VARCHAR (3) null |Группа упаковки | |
|DangerSing |VARCHAR (15) null |Знак опасности | |
|SpecialProvision |VARCHAR (20) null |Специальные положения | |
|Restriction |VARCHAR (15) null |Ограниченные и освобожденные количества | |
|PackingInstruction |VARCHAR (25) null |Инструкции по упаковке | |
|PackingSpecialProvision |VARCHAR (30) null |Специальные положения по упаковке | |
|CommonPackingProvision |VARCHAR (15) null |Положения по совместной упаковке | |
|TankerTransport |CHAR (2) null |Транспортное средство для перевозки в цистернах | |
|TransportCategory |INT null |Транспортная категория | |
|HazarIdentificationNumber |VARCHAR (4) null |Идентификационный номер опасности | |
|IsActive |BIT not null |Активно | |

## Подсистема хранения адресов

### Типы адресов

<TableName name='Addr_AddressType'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** средний уровень.

Тип адреса (вариант его использования).

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdAddressType |INT not null |Идентификатор |<Key/> |
|Name |VARCHAR (50) not null |Наименование | |

### Типы АТЕ

<TableName name='Addr_AddressType'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

Тип административно-территориальной единицы. Здесь описаваются типы населенных пунктов, областей и территорий, а также формат их представления в представлении адреса.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdATUType |INT not null |Идентификатор |<Key/> |
|Name |VARCHAR (50) not null |Наименование | |
|Acronim |VARCHAR (20) null |Акроним | |
|DefaultOrder |INT null |Порядок использования при составлении адресной строки | |
|DefaultPrefix |INT not null |Использовать Акроним: как префикс (2), постфикс (1) или не использовать вообще (0) | |

#### Локализация данных

Тип административно территориальной единицы на различных языках.

<TableName name='Addr_ATUTypeNationalData'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdATUType |INT not null |Идентификатор типа АТЕ (Addr_AdministrativTerritorialUnitType) |<Key/> |
|IdLanguage |INT not null |Идентификатор национального языка (NationalLanguage) |<Key/> |
|Name |VARCHAR (50) not null |Наименование на национальном языке | |
|Acronim |VARCHAR (20) null |Акроним на национальном языке | |

### АТЕ

<TableName name='Addr_AdministrativTerritorialUnit'></TableName>
<HandbookType is-not-periodic></HandbookType>

**Доступ:** средний уровень.

Административно-территориальные единицы стран и регионов.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdATU |INT not null |Идентификатор |<Key/> |
|IdCountry |INT not null |Идентификатор страны (Country) | |
|IsGroup |BIT not null |Это группа | |
|ParentId |INT null |Идентификатор родительской группы (Addr_AdministrativTerritorialUnit) | |
|Name |VARCHAR (100) not null |Наименование | |
|IdATUType |INT not null |Идентификатор типа АТЕ (Addr_AdministrativTerritorialUnitType) | |

#### Локализация данных

Наименование АТЕ стран и регионов на различных языках.

<TableName name='Addr_ATUNationalData'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdATU |INT not null |Идентификатор АТЕ (Addr_AdministrativTerritorialUnit) |<Key/> |
|IdLanguage |INT not null |Идентификатор национального языка (NationalLanguage) |<Key/> |
|Name |NVARCHAR (100) not null |Наименование на национальном языке | |

### Справочник адресов

<TableName name='Addr_Address'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** средний уровень.

Здесь, по сути, составляется уникальная адресная строка.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdAddress |INT not null |Идентификатор |<Key/> |
|IdCountry |INT not null |Идентификатор страны (Country) | |
|IdATU |INT not null |Идентификатор АТЕ (Addr_AdministrativTerritorialUnit) | |
|ATUAddress |VARCHAR (100) null |Местоположение внутри АТЕ | |
|PostCode |VARCHAR (20) null |Индекс (почтовый) | |
|ExtraInfo |VARCHAR (100) null |Дополнительная информация | |
|IsActive |BIT not null |Активно | |

#### Локализация данных

Информация об адресах на различных языках.

<TableName name='Addr_AddressNationalData'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdAddress |INT not null |Идентификатор адреса (Addr_Address) |<Key/> |
|IdLanguage |INT not null |Идентификатор языка (NationalLanguage) |<Key/> |
|ATUAddress |NVARCHAR (100) null |Местоположение внутри АТЕ на национальном языке | |
|ExtraInfo |NVARCHAR (100) null |Дополнительная информация на национальном языке | |

### Настройки отображения адресов

<TableName name='Addr_CountryAddressSettings'></TableName>
<HandbookType is-simply ></HandbookType>

**Доступ:** высокий уровень.

Настройка отображения адресной строки отдельных стран мира.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdAddressSettings |INT not null |Идентификатор |<Key/> |
|IdCountry |INT not null |Идентификатор страны (Country) | |
|IdAddressType |INT null |Идентификатор типа адреса (Addr_AddressType) | |
|IdLanguage |INT null |Язык отображения как АТЕ так и типов АТЕ (NationalLanguage) | |
|StringFormat |VARCHAR (10) null |Формат представления адресной строки (S{P}ACE): S-адресное пространство внутри АТЕ, P-Индекс, может и не указываться, A-АТЕ - построенный или по дефолту или по спец сортировке описатель АТЕ, C-наименование страны, E-Дополнительная информация по адресу | |
|BeginDate |DATE not null |Дата начала действия | |
|IsActive |BIT not null |Активно | |

#### Порядок вхождения типов АТЕ в адресную строку

<TableName name='Addr_CountryAddressSettingsOrderData'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdAddressSettings |INT not null |Идентификатор региональной настройки (Addr_CountryAddressSettings) | |
|IdATUType |INT not null |Идентификатор типа АТЕ (Addr_AddressType) | |
|Prefix |INT not null |Использовать Акроним АТЕ как префикс(2), постфикс(1) или неиспользовать вообще (0) | |
|OrderNumber |INT null |Порядковый номер типа АТЕ при построении адресной строки | |

## Национальные классификаторы АТЕ

### Национальные классификаторы АТЕ

<TableName name='Addr_CountryAddressesClassifierLocality'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

Описание национальных классификаторов АТЕ.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdClassifier |INT not null |Идентификатор |<Key/> |
|IdCountry |INT not null |Идентификатор страны (Country) | |
|Name |VARCHAR (300) not null |Наименование классификатора | |
|Acronim |VARCHAR (20) null |Аббревиатура классификатора | |
|TableName |VARCHAR (100) null |Имя таблицы хранения данных | |
|KeyFieldName |VARCHAR (100) null |Имя ключевого поля в таблице хранения данных | |

### Общегосударственный классификатор "Система обозначений объектов административно-территориального деления и населенных пунктов РБ

<TableName name='Addr_AddressesClassifierBY_Locality'></TableName>
<HandbookType is-simply></HandbookType>

**Доступ:** высокий уровень.

**Источник:** ОКРБ 003-94

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdAddrClassifierBY_Locality |INT not null |Идентификатор |<Key/> |
|IsActive |BIT not null |Активно | |
|Description |VARCHAR (250) null |Описание | |

#### Периодические данные

Характеристика СОАТО РБ

<TableName name='Addr_AddressesClassifierBY_LocalityProperty'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdProperty |INT not null |Идентификатор записи |<Key/> |
|IdElement |INT not null |Идентификатор элемента СОАТО (Addr_AddressesClassifierBY_Locality)| |
|BeginDate |DATE not null |Дата начала действия | |
|Name |VARCHAR (50) not null |Наименование | |
|LocalityType |VARCHAR (50) not null |Тип населенного пункта | |
|Code |VARCHAR (10) not null |Код СОАТО | |
|EndDate |DATE null |Дата окончания действия значения | |
|LocalityTypeCode |VARCHAR (3) null |Код типа населенного пункта | |
|DistrictCode |VARCHAR (3) null |Шифр области местоположения | |
|DistrictName |VARCHAR (50) null |Область местоположения | |
|RegionCode |VARCHAR (3) null |Шифр района местоположения | |
|RegionName |VARCHAR (50) null |Район местоположения | |

### Классификатор адресов Российской Федерации - населенные пункты

<TableName name='Addr_AddressesClassifierRU_Locality'></TableName>
<HandbookType is-simply></HandbookType>

**Доступ:** высокий уровень.

**Источник:** [КЛАДР РФ](https://kladr-rf.ru/)

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdAddrClassifierRU_Locality |INT not null |Идентификатор |<Key/> |
|IsActive |BIT not null |Активно | |
|Description |VARCHAR (250) null |Описание | |

#### Периодические данные

Характеристика Классификатора адресов Российской Федерации - населенных пунктов

<TableName name='Addr_AddressesClassifierRU_LocalityProperty'></TableName>

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdProperty |INT not null |Идентификатор записи |<Key/> |
|IdElement |INT not null |Идентификатор населённого пункта (Addr_AddressesClassifierRU_Locality)| |
|BeginDate |DATE not null |Дата начала действия | |
|Name |VARCHAR (50) not null |Наименование | |
|LocalityType |VARCHAR (10) not null |Тип населенного пункта | |
|Code |VARCHAR (11) not null |Код КЛАДР | |
|Postcode |VARCHAR (6) null |Почтовый индекс | |
|ARCPSCode |VARCHAR (11) null |Код ОКАТО (Общероссийский классификатор объектов административно-территориального деления) | |
|Status |INT null |Статус объекта (определяет признак центра административно-территориального образования) | |
|Version |INT not null |Номер версии | |

### Привязка к АТЕ TreeNSI

<TableName name='Addr_ATUCountryClassifierLocality'></TableName>
<HandbookType is-simply is-not-periodic></HandbookType>

**Доступ:** высокий уровень.

Привязка особой смысловой нагрузки не несет, единственное применение – контроль наличия `АТЕ` более высокого уровня, при вводе нового `АТЕ` в автоматическом режиме.

**Структура:**

| Наименование поля | Тип | Описание | Ключ |
|---------------|:--:|------|:--:|
|IdATU |INT not null |Идентификатор АТЕ (Addr_AdministrativTerritorialUnit) |<Key/> |
|IdClassifier |INT not null |Идентификатор национального классификатора АТЕ (Addr_CountryAddressesClassifierLocality) |<Key/> |
|IdClassifierLocality |INT not null |Идентификатор АТЕ в национальном классификаторе (в таблице хранения данных) |<Key/> |
