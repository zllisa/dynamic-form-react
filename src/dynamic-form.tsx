import React, { Component, useEffect, useState } from 'react';
import { Input, DatePicker, Button, message, Form, Radio, Checkbox } from 'antd';
import { ReactSortable } from "react-sortablejs";
import CustomComponent from './custom-component';
import QuestionRadio from './components/radio/question';
import QuestionCheckBox from './components/checkbox/question';
import QuestionAnswer from './components/answer/question';
import QuestionNumber from './components/number/question';
import QuestionDatePicker from './components/datepicker/question';
import EditRadio from './components/radio/edit';
import EditAnswer from './components/answer/edit';
import EditNumber from './components/number/edit';
import EditDatePicker from './components/datepicker/edit';
import LabelRadio from './components/radio/label';
import LabelCheckBox from './components/checkbox/label';
import LabelAnswer from './components/answer/label';
import LabelNumber from './components/number/label';
import LabelDatePicker from './components/datepicker/label';
import EditCheckBox from './components/checkbox/edit';
import './dynamic-form.scss';
import { FormOutlined } from '@ant-design/icons';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


export interface ItemType {
  id: string;
  name: string;
  questionName: string;
  editName: string;
  attrs: AttrType;
  funcs:FuncsType
}

export interface AttrType {
  [x: string]: any;
  options?: OptionType[]
  title?: string;
  focus?: boolean;
  required?: boolean;
  tips?: string;
  unit?: string;
  dateType?:string;
}

export interface FuncsType{
  onClick?: (key: string, state: ItemType[], e?: React.MouseEvent<HTMLElement>,) => void
  onCopy?: (key: string, state: ItemType[], e?: React.MouseEvent<HTMLElement>) => void;
  onDelete?: (key: string, state: ItemType[], e?: React.MouseEvent<HTMLElement>) => void;
  onRelated?: (key: string, state: ItemType[], e?: React.MouseEvent<HTMLElement>) => void;
  onUpdate?: (state: ItemType[]) => void
}
export interface OptionType {
  key?: string;
  value?: string;
  type?: string;
}
const QuestionComponent: any = {
  QuestionRadio,
  QuestionCheckBox,
  QuestionAnswer,
  QuestionNumber,
  QuestionDatePicker
}
const LabelComponent: any = {
  LabelRadio,
  LabelCheckBox,
  LabelAnswer,
  LabelNumber,
  LabelDatePicker
}
const EditComponent: any = {
  EditRadio,
  EditAnswer,
  EditCheckBox,
  EditNumber,
  EditDatePicker
}

const FormComponent: any = {
  Input,

  DatePicker,
}

export let id = 0
export const createId = () => String(id++);

const DynamicForm: React.FC = () => {
  const [showEdit, setShowEdit] = useState<string>('')
  const [focus, setFocus] = useState<boolean>(false)
  const [state2, setState2] = useState<ItemType[]>([]);
  const [number, setNumber] = useState<number>(0)
  const [currentId, setCurrentId] = useState<string>('')
  const [isEdit, setIsEdit] = useState<boolean>(true)


  const onClick = (key: string, state: ItemType[], e?: React.MouseEvent<HTMLElement>,) => {
    state.map((item) => {
      if (item.attrs.focus) {
        setShowEdit(item.editName)
      }
    })
    setCurrentId(key)
    setState2(state)
  }
  const handleOnDataUpdate = (state: ItemType[]) => {
    setState2(state)
  }
  const handleOnDelete = (key: string, state: ItemType[], e?: React.MouseEvent<HTMLElement>) => {
    setState2(state)
  }
  const handleOnCopy = (key: string, state: ItemType[], e?: React.MouseEvent<HTMLElement>) => {
    setState2(state)
  }
  const data: ItemType[] = [
    {
      id: 'LabelRadio',
      name: 'LabelRadio',
      questionName: 'QuestionRadio',
      editName: 'EditRadio',
      attrs: {
        options: [
          { key: '1', value: '??????1', type: 'n' },
          { key: '2', value: '??????2', type: 'n' },
          { key: '3', value: '??????3', type: 'n' },
        ],
        title: "?????????",
        type: 'R',
      },
      funcs:{
        onClick: onClick,
        onUpdate: handleOnDataUpdate,
        onDelete: handleOnDelete,
        onCopy: handleOnCopy
      }
    },
    {
      id: 'LabelCheckBox',
      name: 'LabelCheckBox',
      questionName: 'QuestionCheckBox',
      editName: 'EditCheckBox',
      attrs: {
        options: [
          { key: '1', value: '??????1', type: 'n' },
          { key: '2', value: '??????2', type: 'n' },
          { key: '3', value: '??????3', type: 'n' },
        ],
        title: "?????????",
        type: 'C',
      },
      funcs:{
        onClick: onClick,
        onUpdate: handleOnDataUpdate,
        onDelete: handleOnDelete,
        onCopy: handleOnCopy
      }
    },
    {
      id: 'LabelAnswer',
      name: 'LabelAnswer',
      questionName: 'QuestionAnswer',
      editName: 'EditAnswer',
      attrs: {
        title: '?????????',
        type: 'A',
      },
      funcs:{
        onClick: onClick,
        onUpdate: handleOnDataUpdate,
        onDelete: handleOnDelete,
        onCopy: handleOnCopy
      }
    },
    {
      id: 'LabelNumber',
      name: 'LabelNumber',
      questionName: 'QuestionNumber',
      editName: 'EditNumber',
      attrs: {
        title: "?????????",
        tips: "???????????????",
        type: 'N',
      },
      funcs:{
        onClick: onClick,
        onUpdate: handleOnDataUpdate,
        onDelete: handleOnDelete,
        onCopy: handleOnCopy
      }
    },
    {
      id: 'LabelDatePicker',
      name: 'LabelDatePicker',
      questionName: 'QuestionDatePicker',
      editName: 'EditDatePicker',
      attrs: {
        title: "?????????",
        tips: "???????????????",
        type: 'D',
      },
      funcs:{
        onClick: onClick,
        onUpdate: handleOnDataUpdate,
        onDelete: handleOnDelete,
        onCopy: handleOnCopy
      }
    },
  ];
  const [state, setState] = useState<ItemType[]>(data);


  const loop = (arr: any) => (
    arr.map((item: any) => {
      if (item.children) {
        return <div {...item.attr} >{loop(item.children)}</div>
      }
      const ComponentInfo = LabelComponent[item.name]
      return <ComponentInfo {...item.attr} />
    })
  );

  return (
    <div style={{ height: '100%', overflowY: 'hidden' }}>
      <div className="title" style={{ display: 'flex', height: '50px', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', borderBottom: '1px solid #eee' }}
      >
        {
          isEdit &&
          <>
            <div><FormOutlined  style={{ fontSize: '16px', color: '#08c',marginRight:'6px' }} /><span style={{ fontSize: '16px', color: '#08c',marginRight:'6px' }}>????????????</span></div>
            <div>
              <Button onClick={() => { if (state2.length > 0) { setIsEdit(false) } else { message.warn('???????????????') } }}>??????</Button>
              <Button>??????</Button>
            </div>
          </>
        }
        {
          !isEdit &&
          <>
            <Button onClick={() => setIsEdit(true)}>??????</Button>
            <div>
              <Button>??????</Button>
            </div>
          </>
        }
      </div>
      {
        isEdit &&
        <div className="edit_from" style={{ display: 'flex', padding: '20px', height: 'calc(100% - 50px)' }}>
          <ReactSortable
            style={{ width: '200px' }}
            group={{ name: 'groupName', pull: 'clone', put: false, }}
            sort={false}
            animation={500}
            list={state}
            setList={setState}

          >
            {state.map((item) => (
              <div key={item.id}>
                <CustomComponent key={item.id} id={item.id} component={LabelComponent[item.name]}></CustomComponent>
              </div>
            ))}
          </ReactSortable>
          <ReactSortable
            style={{ flexGrow: 1, padding: '0 20px', borderRight: '1px solid #eee', borderLeft: '1px solid #eee' }}
            group={{ name: 'formName', pull: true, put: true, }}
            sort={true}
            list={state2}
            animation={500}
            setList={setState2}
            clone={item => {
              const id = createId()
              setCurrentId(id)
              return { ...item, id }
            }}
          >

            {state2.length > 0 &&
              state2.map((item, index) => (
                <div key={item.id}>
                  {
                    <CustomComponent key={item.id} id={item.id} attrs={{ ...item.attrs, number: index + 1 }} funcs={item.funcs} state={state2} component={QuestionComponent[item.questionName]}></CustomComponent>
                  }
                </div>
              ))

            }
          </ReactSortable>

          <div style={{ width: '300px' }}>
            {
              showEdit ?
                state2.map((item) => {
                  if (item.id === currentId) {
                    return (
                      <CustomComponent key={`ID_${currentId}`} id={currentId} attrs={item.attrs} funcs={item.funcs} component={EditComponent[showEdit]} state={state2} ></CustomComponent>
                    )
                  }
                })
                :
                <div>?????????????????????????????????</div>
            }
          </div>

          {
            state2.length <= 0 &&
            <div style={{ position: 'absolute', top: '50%', left: '40%', zIndex: 100 }}>???????????????</div>
          }
        </div>
      }
      {
        !isEdit &&
        <div className="preview_form" style={{ background: '#f1f1f1', height: 'calc(100% - 50px)', display: 'flex', justifyContent: 'center' }}>

          <Form style={{ width: '80%', background: '#fff', padding: '20px' }}>
            {
              state2.map((item, index) => {
                switch (item.attrs.type) {
                  case 'R': {
                    return (
                      <Form.Item required={item.attrs.required} name={item.attrs.title} label={`${index + 1}.${item.attrs.title}`}>
                        <Radio.Group>
                          {
                            item.attrs.options?.map((option) => {
                              return <Radio value={option.key}> {option.value}</Radio>
                            })
                          }
                        </Radio.Group>
                      </Form.Item>
                    )
                  }
                  case 'C': {
                    return(
                      <Form.Item required={item.attrs.required} name={item.attrs.title} label={`${index + 1}.${item.attrs.title}`}>
                      <Checkbox.Group>
                        {
                          item.attrs.options?.map((option) => {
                            return <Checkbox value={option.key} >{option.value}</Checkbox>
                          })
                        }
                      </Checkbox.Group>
                    </Form.Item>
                    )
                  }
                  case 'A': {
                    return (
                      <Form.Item required={item.attrs.required} name={item.attrs.title} label={`${index + 1}.${item.attrs.title}`}>
                      <Input.TextArea placeholder={item.attrs.tips}/>
                    </Form.Item>
                    )
                  }
                  case 'N': {
                    return (
                      <Form.Item required={item.attrs.required} name={item.attrs.title} label={`${index + 1}.${item.attrs.title}`}>
                      <Input placeholder={item.attrs.tips} type="number"/>
                    </Form.Item>
                    )
                  }
                  case 'D': {
                    return (
                      <Form.Item required={item.attrs.required} name={item.attrs.title} label={`${index + 1}.${item.attrs.title}`}>
                      {
                        item.attrs.dateType==="YYMMDD"?
                        <DatePicker  format="YYYY-MM-DD"/>
                        :
                        <DatePicker showTime  format="YYYY-MM-DD HH:mm:ss"/>
                      }
                    </Form.Item>
                    )
                  }
                }

              })
            }

          </Form>
        </div>
      }
    </div>
  );
}

export default DynamicForm;
