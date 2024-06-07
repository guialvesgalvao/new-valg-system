import { useEffect, useRef } from "react";
import DataGrid, {
  HeaderFilter,
  Grouping,
  GroupPanel,
  SearchPanel,
  Export,
  Column,
  Summary,
  GroupItem,
  ColumnChooser,
  ColumnChooserSearch,
  ColumnChooserSelection,
  Scrolling,
  FilterRow,
  Paging,
  Pager,
  Selection,
  Toolbar,
  Item
} from 'devextreme-react/data-grid';
import dxDataGrid from "devextreme/ui/data_grid";
import { exportDataGrid } from "../../shared/services/exportDataGrid";
import { Button } from "devextreme-react";
import { RemoveFilterIcon, ResetIcon } from "../../assets/icons";
import 'devextreme/dist/css/dx.dark.css';
import ptMessages from "devextreme/localization/messages/pt.json";
import { loadMessages, locale } from "devextreme/localization";

export function GridConfig() {

const gridRef = useRef<
    dxDataGrid<any, any> | undefined
  >();

  function resetGrid() {
    gridRef?.current?.state({});
  }

  async function resetFilters() {
    gridRef?.current?.clearFilter();
  }



  useEffect(() => {
    //Função responsável por traduzir a Grid
    loadMessages(ptMessages);
    locale("pt-BR");
  }, []);

  return (
    <div style={{ width: '100%', marginTop: '1.5rem' }}>
      <DataGrid
        // ref={(ref) => {
        //   gridRef.current = ref?.instance;
        // }}
        height={800}
        dataSource={[]}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        hoverStateEnabled={true}
        onExporting={(e) => exportDataGrid(e as any, 'contas')}
        showBorders={true}
        noDataText={'Nenhuma Conta Encontrada'}
        columnResizingMode={'widget'}
        columnMinWidth={100}
        width="100%"
        showColumnLines
        showRowLines
        showColumnHeaders
        allowColumnResizing={true}
        keyExpr="Id"
      >

        <Grouping
          autoExpandAll={false}
          allowCollapsing
          contextMenuEnabled />

        <GroupPanel
          visible={true}
          emptyPanelText="Arraste aqui o cabeçalho de uma coluna para criar o agrupamento"
          allowColumnDragging />

        <Selection
          mode="multiple"
          showCheckBoxesMode={"always"}
          allowSelectAll={false}
        />

        <SearchPanel
          highlightSearchText
          searchVisibleColumnsOnly
          visible={true}
          highlightCaseSensitive={true}
          placeholder="Pesquisar..." />

        <HeaderFilter visible={true} />

        <FilterRow visible={true} />

        <Scrolling mode="virtual" showScrollbar="always" />

        <Export enabled={true} formats={['xlsx', 'pdf']} />

        <Toolbar>
          <Item name="groupPanel"></Item>

          <Item>
            <Button
              style={{ width: 36, height: 36 }}
              hint={"Redefinir grid"}
              onClick={resetGrid}
            >
              <ResetIcon />
            </Button>
          </Item>

          <Item>
            <Button
              style={{ width: 36, height: 36 }}
              hint={"Limpar todos os filtros da grid"}
              onClick={resetFilters}
            >
              <RemoveFilterIcon />
            </Button>
          </Item>

          <Item name="columnChooserButton" />

          <Item name="searchPanel" />

          <Item name="exportButton"></Item>
        </Toolbar>

        <Summary>
          <GroupItem
            summaryType="count"
            customizeText={(data) => `${data.value}`}
          />
        </Summary>

        <ColumnChooser
          mode="select"
          allowSearch
          sortOrder="asc"
          enabled
          title="Seletor de Colunas"
        >
          <ColumnChooserSearch
            editorOptions={{ placeholder: 'Pesquise o nome da coluna' }}
            enabled

          />

          <ColumnChooserSelection
            allowSelectAll
          />
        </ColumnChooser>

        <Column
          width={80}
          minWidth={40}
          dataField="id"
          dataType="number"
          caption="ID"
          alignment="right"
          sortOrder="desc"
          showInColumnChooser={true}
          sortIndex={0}
        />

        <Column
          width={350}
          dataField="name"
          caption="Nome da Conta"
          dataType="string"
          showInColumnChooser={true}
          alignment="left"
        />

        <Column
          width={190}
          dataField="value"
          caption="Valor"
          dataType="number"
          visible={true}
          showInColumnChooser={true}
          alignment="left"
        />

        <Column
          width={155}
          dataField="dueDate"
          caption="Vencimento"
          dataType="date"
          visible={true}
          showInColumnChooser={true}
          alignment="right"
        />

        <Column
          width={155}
          dataField="status"
          caption="Status"
          dataType="string"
          visible={true}
          showInColumnChooser={true}
          alignment="right"
        />

        <Column
          width={210}
          dataField="priority"
          caption="Prioridade"
          dataType="string"
          showInColumnChooser={true}
          alignment="right"
        />

        <Column
          width={210}
          dataField="relationalCode"
          caption="Código Relacional"
          dataType="number"
          showInColumnChooser={true}
          alignment="right"
        />

        <Column
          width={155}
          dataField="created"
          caption="Criado em"
          dataType="date"
          showInColumnChooser={true}
          alignment="left"
        />

        <Column
          width={150}
          dataField="modified"
          caption="Modificado em"
          dataType="date"
          visible={true}
          showInColumnChooser={true}
          alignment="left"
        />

        <Paging />

        <Pager
          allowedPageSizes={"auto"}
          displayMode="full"
          showPageSizeSelector
          showNavigationButtons
          visible
        />

      </DataGrid>
    </div>
  )
}


