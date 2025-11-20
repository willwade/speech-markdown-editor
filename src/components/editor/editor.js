import React, {
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import {
  AddressElement,
  AudioElement,
  BreakElement,
  CardinalElement,
  CharactersElement,
  DateElement,
  DefaultsElement,
  DisappointedElement,
  DjElement,
  EmphasisElement,
  ExcitedElement,
  ExpletiveElement,
  FractionElement,
  InterjectionElement,
  IpaElement,
  LangElement,
  MarkElement,
  NewscasterElement,
  NumberElement,
  OrdinalElement,
  PhoneElement,
  SubElement,
  TimeElement,
  UnitElement,
  VoiceElement,
  VoiceSectionElement,
  WhisperElement,
} from "../../elements";

import { Recent } from "../../libs/storage";

import { serializeToSMD } from "../../libs/serialize";

const createRenderElement = (platform) => {
  const RenderElement = (props) => {
    switch (props.element.type) {
      case "audio":
        return <AudioElement {...props} />;
      case "address":
        return <AddressElement {...props} />;
      case "emphasis":
        return <EmphasisElement {...props} />;
      case "break":
        return <BreakElement {...props} />;
      case "cardinal":
        return <CardinalElement {...props} />;
      case "characters":
        return <CharactersElement {...props} />;
      case "date":
        return <DateElement {...props} />;
      case "defaults":
        return <DefaultsElement {...props} />;
      case "disappointed":
        return <DisappointedElement {...props} />;
      case "dj":
        return <DjElement {...props} />;
      case "excited":
        return <ExcitedElement {...props} />;
      case "expletive":
        return <ExpletiveElement {...props} />;
      case "fraction":
        return <FractionElement {...props} />;
      case "interjection":
        return <InterjectionElement {...props} />;
      case "ipa":
        return <IpaElement {...props} />;
      case "lang":
        return <LangElement {...props} />;
      case "mark":
        return <MarkElement {...props} />;
      case "newscaster":
        return <NewscasterElement {...props} />;
      case "number":
        return <NumberElement {...props} />;
      case "ordinal":
        return <OrdinalElement {...props} />;
      case "phone":
        return <PhoneElement {...props} />;
      case "sub":
        return <SubElement {...props} />;
      case "time":
        return <TimeElement {...props} />;
      case "unit":
        return <UnitElement {...props} />;
      case "whisper":
        return <WhisperElement {...props} />;
      case "voice":
        return <VoiceElement {...props} platform={platform} />;
      case "voicesection":
        return <VoiceSectionElement {...props} platform={platform} />;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  };
  RenderElement.displayName = "RenderElement";
  return RenderElement;
};

const initialValue = [
  {
    children: [
      { text: "Sample " },
      {
        value: "speech",
        children: [{ text: " " }],
        type: "voice",
        voice: "Nicole",
      },
      { text: " markdown" },
    ],
  },
];

const withEmbeds = (editor) => {
  editor.isVoid = (element) => !!element.type;
  editor.isInline = (element) => !!element.type;
  return editor;
};

export function EditorComponent(props, ref) {
  const { onChange, platform = "amazon-alexa" } = props;
  const [value, setValue] = useState(initialValue);

  const editor = useMemo(() => withEmbeds(withReact(createEditor())), []);
  const renderElement = useMemo(
    () => createRenderElement(platform),
    [platform]
  );

  useImperativeHandle(ref, () => {
    return {
      insert: (node) => {
        let defaultValue = "";
        const fragment = editor.getFragment();
        if (fragment.length === 1) {
          defaultValue = fragment[0].children[0].text;
        }
        if (node.type === "break") {
          defaultValue = undefined;
        }
        if (node.type === "voice") {
          let voiceNode = Object.assign({}, node);
          delete voiceNode.type;
          let type = Object.keys(voiceNode)[0];
          Recent.add({
            label: `${type}${node[type] ? `:${node[type]}` : ``}`,
            node,
          });
        } else {
          Recent.add({
            label: `${node.type}${
              node[node.type] ? `:${node[node.type]}` : ``
            }`,
            node,
          });
        }
        const newNode = Object.assign(
          {
            value: defaultValue,
            children: [{ text: " " }],
          },
          node
        );
        Transforms.insertNodes(editor, [
          newNode,
          {
            children: [{ text: " " }],
          },
        ]);
      },
      getMarkdown: () => {
        return serializeToSMD(value[0].children);
      },
      setMarkdown: (markdown) => {
        // For now, just set to initial value
        // TODO: Parse markdown back to Slate nodes
        setValue(initialValue);
      },
    };
  });

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        console.log(JSON.stringify(value));
        onChange(serializeToSMD(value[0].children));
      }}
    >
      <Editable
        placeholder="Start Typing Here"
        onKeyDown={(event) => {
          // eslint-disable-next-line react-hooks/immutability
          editor.lastKeyDown = event.key;
        }}
        renderElement={renderElement}
      />
    </Slate>
  );
}

export const Editor = forwardRef(EditorComponent);
Editor.displayName = "Editor";
