// TEMPORARY: uniwind cascade-layer verification harness. Do not commit.
/* eslint-disable lingui/no-unlocalized-strings */
// Renders every inline component across its variant matrix, each case twice:
// plain and with distinctive className overrides on every slot.
import { LinearGradient } from 'expo-linear-gradient';
import {
  Accordion,
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  CloseButton,
  ControlField,
  Description,
  FieldError,
  Input,
  InputGroup,
  InputOTP,
  Label,
  LinkButton,
  ListGroup,
  PressableFeedback,
  Radio,
  RadioGroup,
  ScrollShadow,
  SearchField,
  Select,
  Separator,
  Skeleton,
  SkeletonGroup,
  Slider,
  Spinner,
  Surface,
  Switch,
  Tabs,
  TagGroup,
  TextArea,
  TextField,
  Typography,
} from 'heroui-native';
import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';

const OV_VIEW =
  'bg-[#ff00aa] border-[#00aaff] border-[2px] rounded-[3px] p-[9px]';
const OV_TEXT = 'text-[#00aa55] text-[11px] font-bold';
const OV_BOX = 'bg-[#ff00aa] border-[#00aaff] rounded-[3px] h-[30px] w-[30px]';

const SIZES = ['sm', 'md', 'lg'] as const;
const COLORS = ['accent', 'default', 'success', 'warning', 'danger'] as const;
const BOOLS = [false, true] as const;

const Case = ({ id, children }: { id: string; children: ReactNode }) => (
  <View testID={`case:${id}`} collapsable={false} className="py-1">
    {children}
  </View>
);

/** Render a case plain and with overrides. */
const Pair = ({
  id,
  render,
}: {
  id: string;
  render: (ov: boolean) => ReactNode;
}) => (
  <>
    <Case id={`${id}`}>{render(false)}</Case>
    <Case id={`${id}/ov`}>{render(true)}</Case>
  </>
);

const noop = () => {};

const o = (ov: boolean, cls: string) => (ov ? cls : undefined);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <View className="gap-1 mb-6">
    <Text className="text-foreground font-bold text-lg">{title}</Text>
    {children}
  </View>
);

export const LayerCases = () => (
  <View className="px-4">
    <Section title="Button">
      {(
        [
          'primary',
          'secondary',
          'tertiary',
          'outline',
          'ghost',
          'danger',
        ] as const
      ).flatMap((variant) =>
        SIZES.map((size) => (
          <Pair
            key={`${variant}-${size}`}
            id={`button/${variant}/${size}`}
            render={(ov) => (
              <Button variant={variant} size={size} className={o(ov, OV_VIEW)}>
                <Button.Label className={o(ov, OV_TEXT)}>Label</Button.Label>
              </Button>
            )}
          />
        ))
      )}
      <Pair
        id="button/icon-only"
        render={(ov) => (
          <Button isIconOnly className={o(ov, OV_VIEW)}>
            <Button.Label className={o(ov, OV_TEXT)}>+</Button.Label>
          </Button>
        )}
      />
      <Pair
        id="button/disabled"
        render={(ov) => (
          <Button isDisabled className={o(ov, OV_VIEW)}>
            <Button.Label className={o(ov, OV_TEXT)}>Disabled</Button.Label>
          </Button>
        )}
      />
      <Pair
        id="button/string-child"
        render={(ov) => (
          <Button className={o(ov, OV_VIEW)}>String child</Button>
        )}
      />
    </Section>

    <Section title="Chip">
      {(['primary', 'secondary', 'tertiary', 'soft'] as const).flatMap(
        (variant) =>
          COLORS.flatMap((color) =>
            SIZES.map((size) => (
              <Pair
                key={`${variant}-${color}-${size}`}
                id={`chip/${variant}/${color}/${size}`}
                render={(ov) => (
                  <Chip
                    variant={variant}
                    color={color}
                    size={size}
                    className={o(ov, OV_VIEW)}
                  >
                    <Chip.Label className={o(ov, OV_TEXT)}>Chip</Chip.Label>
                  </Chip>
                )}
              />
            ))
          )
      )}
      <Pair
        id="chip/translucent-bg"
        render={(ov) => (
          <Chip size="sm" className={o(ov, 'bg-background/25')}>
            <Chip.Label className={o(ov, 'text-foreground/85')}>
              4 total
            </Chip.Label>
          </Chip>
        )}
      />
    </Section>

    <Section title="Avatar">
      {(['default', 'soft'] as const).flatMap((variant) =>
        COLORS.flatMap((color) =>
          SIZES.map((size) => (
            <Pair
              key={`${variant}-${color}-${size}`}
              id={`avatar/${variant}/${color}/${size}`}
              render={(ov) => (
                <Avatar
                  alt="JD"
                  variant={variant}
                  color={color}
                  size={size}
                  className={o(ov, OV_VIEW)}
                >
                  <Avatar.Fallback className={o(ov, OV_TEXT)}>
                    JD
                  </Avatar.Fallback>
                </Avatar>
              )}
            />
          ))
        )
      )}
    </Section>

    <Section title="Alert">
      {(['default', 'accent', 'success', 'warning', 'danger'] as const).map(
        (status) => (
          <Pair
            key={status}
            id={`alert/${status}`}
            render={(ov) => (
              <Alert status={status} className={o(ov, OV_VIEW)}>
                <Alert.Indicator className={o(ov, OV_BOX)} />
                <Alert.Content className={o(ov, OV_VIEW)}>
                  <Alert.Title className={o(ov, OV_TEXT)}>Title</Alert.Title>
                  <Alert.Description className={o(ov, OV_TEXT)}>
                    Description
                  </Alert.Description>
                </Alert.Content>
              </Alert>
            )}
          />
        )
      )}
    </Section>

    <Section title="Card & Surface">
      <Pair
        id="card"
        render={(ov) => (
          <Card className={o(ov, OV_VIEW)}>
            <Card.Header className={o(ov, OV_VIEW)}>
              <Card.Title className={o(ov, OV_TEXT)}>Title</Card.Title>
              <Card.Description className={o(ov, OV_TEXT)}>
                Description
              </Card.Description>
            </Card.Header>
            <Card.Body className={o(ov, OV_VIEW)} />
            <Card.Footer className={o(ov, OV_VIEW)} />
          </Card>
        )}
      />
      {(['default', 'secondary', 'tertiary', 'transparent'] as const).map(
        (variant) => (
          <Pair
            key={variant}
            id={`surface/${variant}`}
            render={(ov) => (
              <Surface variant={variant} className={o(ov, OV_VIEW)}>
                <Text>Surface</Text>
              </Surface>
            )}
          />
        )
      )}
    </Section>

    <Section title="Checkbox / Radio / Switch">
      {(['primary', 'secondary'] as const).flatMap((variant) =>
        BOOLS.flatMap((isSelected) =>
          BOOLS.flatMap((isInvalid) =>
            BOOLS.map((isDisabled) => (
              <Pair
                key={`${variant}-${isSelected}-${isInvalid}-${isDisabled}`}
                id={`checkbox/${variant}/sel=${isSelected}/inv=${isInvalid}/dis=${isDisabled}`}
                render={(ov) => (
                  <Checkbox
                    variant={variant}
                    isSelected={isSelected}
                    isInvalid={isInvalid}
                    isDisabled={isDisabled}
                    className={o(ov, OV_BOX)}
                  >
                    <Checkbox.Indicator className={o(ov, OV_BOX)} />
                  </Checkbox>
                )}
              />
            ))
          )
        )
      )}
      {(['primary', 'secondary'] as const).flatMap((variant) =>
        BOOLS.map((isInvalid) => (
          <Pair
            key={`${variant}-${isInvalid}`}
            id={`radio/${variant}/inv=${isInvalid}`}
            render={(ov) => (
              <RadioGroup
                value="a"
                onValueChange={noop}
                isInvalid={isInvalid}
                className={o(ov, OV_VIEW)}
              >
                {['a', 'b'].map((value) => (
                  <RadioGroup.Item
                    key={value}
                    value={value}
                    className={o(ov, OV_VIEW)}
                  >
                    <Label>{value}</Label>
                    <Radio variant={variant} className={o(ov, OV_BOX)}>
                      <Radio.Indicator className={o(ov, OV_BOX)}>
                        <Radio.IndicatorThumb className={o(ov, OV_BOX)} />
                      </Radio.Indicator>
                    </Radio>
                  </RadioGroup.Item>
                ))}
              </RadioGroup>
            )}
          />
        ))
      )}
      {BOOLS.flatMap((isSelected) =>
        BOOLS.map((isDisabled) => (
          <Pair
            key={`${isSelected}-${isDisabled}`}
            id={`switch/sel=${isSelected}/dis=${isDisabled}`}
            render={(ov) => (
              <Switch
                isSelected={isSelected}
                isDisabled={isDisabled}
                className={o(ov, OV_VIEW)}
              >
                <Switch.Thumb className={o(ov, OV_BOX)} />
              </Switch>
            )}
          />
        ))
      )}
      <Pair
        id="control-field"
        render={(ov) => (
          <ControlField isSelected className={o(ov, OV_VIEW)}>
            <View className="flex-1">
              <Label className={o(ov, OV_VIEW)}>
                <Label.Text className={o(ov, OV_TEXT)}>Label</Label.Text>
              </Label>
              <Description className={o(ov, OV_TEXT)}>Description</Description>
            </View>
            <ControlField.Indicator className={o(ov, OV_VIEW)} />
          </ControlField>
        )}
      />
    </Section>

    <Section title="Inputs">
      {(['primary', 'secondary'] as const).flatMap((variant) =>
        BOOLS.flatMap((isInvalid) =>
          BOOLS.map((isDisabled) => (
            <Pair
              key={`${variant}-${isInvalid}-${isDisabled}`}
              id={`input/${variant}/inv=${isInvalid}/dis=${isDisabled}`}
              render={(ov) => (
                <Input
                  variant={variant}
                  isInvalid={isInvalid}
                  isDisabled={isDisabled}
                  placeholder="Placeholder"
                  className={o(ov, `${OV_VIEW} ${OV_TEXT}`)}
                />
              )}
            />
          ))
        )
      )}
      {BOOLS.flatMap((isInvalid) =>
        BOOLS.map((isDisabled) => (
          <Pair
            key={`${isInvalid}-${isDisabled}`}
            id={`text-field/inv=${isInvalid}/dis=${isDisabled}`}
            render={(ov) => (
              <TextField
                isRequired
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                className={o(ov, OV_VIEW)}
              >
                <Label className={o(ov, OV_VIEW)}>
                  <Label.Text className={o(ov, OV_TEXT)}>Email</Label.Text>
                </Label>
                <Input value="value" className={o(ov, OV_VIEW)} />
                <Description className={o(ov, OV_TEXT)}>
                  Description
                </Description>
                <FieldError className={o(ov, OV_TEXT)}>Error</FieldError>
              </TextField>
            )}
          />
        ))
      )}
      <Pair
        id="text-area"
        render={(ov) => (
          <TextArea
            value="Multiline"
            className={o(ov, `${OV_VIEW} ${OV_TEXT}`)}
          />
        )}
      />
      <Pair
        id="search-field"
        render={(ov) => (
          <SearchField value="query" className={o(ov, OV_VIEW)}>
            <SearchField.Group className={o(ov, OV_VIEW)}>
              <SearchField.SearchIcon />
              <SearchField.Input className={o(ov, `${OV_VIEW} ${OV_TEXT}`)} />
              <SearchField.ClearButton className={o(ov, OV_BOX)} />
            </SearchField.Group>
          </SearchField>
        )}
      />
      {BOOLS.map((isDisabled) => (
        <Pair
          key={String(isDisabled)}
          id={`input-group/dis=${isDisabled}`}
          render={(ov) => (
            <InputGroup isDisabled={isDisabled} className={o(ov, OV_VIEW)}>
              <InputGroup.Prefix className={o(ov, OV_VIEW)}>
                <Text>$</Text>
              </InputGroup.Prefix>
              <InputGroup.Input
                value="10"
                className={o(ov, `${OV_VIEW} ${OV_TEXT}`)}
              />
              <InputGroup.Suffix className={o(ov, OV_VIEW)}>
                <Text>USD</Text>
              </InputGroup.Suffix>
            </InputGroup>
          )}
        />
      ))}
      {(['primary', 'secondary'] as const).flatMap((variant) =>
        BOOLS.flatMap((isInvalid) =>
          BOOLS.map((isDisabled) => (
            <Pair
              key={`${variant}-${isInvalid}-${isDisabled}`}
              id={`input-otp/${variant}/inv=${isInvalid}/dis=${isDisabled}`}
              render={(ov) => (
                <InputOTP
                  maxLength={4}
                  value="12"
                  variant={variant}
                  isInvalid={isInvalid}
                  isDisabled={isDisabled}
                  className={o(ov, OV_VIEW)}
                >
                  <InputOTP.Group className={o(ov, OV_VIEW)}>
                    {[0, 1].map((index) => (
                      <InputOTP.Slot
                        key={index}
                        index={index}
                        className={o(ov, OV_VIEW)}
                      />
                    ))}
                  </InputOTP.Group>
                  <InputOTP.Separator className={o(ov, OV_BOX)} />
                  <InputOTP.Group className={o(ov, OV_VIEW)}>
                    {[2, 3].map((index) => (
                      <InputOTP.Slot
                        key={index}
                        index={index}
                        className={o(ov, OV_VIEW)}
                      />
                    ))}
                  </InputOTP.Group>
                </InputOTP>
              )}
            />
          ))
        )
      )}
      <Pair
        id="label-description-error"
        render={(ov) => (
          <View>
            <Label isInvalid className={o(ov, OV_VIEW)}>
              <Label.Text className={o(ov, OV_TEXT)}>Label</Label.Text>
            </Label>
            <Label isDisabled className={o(ov, OV_VIEW)}>
              <Label.Text className={o(ov, OV_TEXT)}>Disabled</Label.Text>
            </Label>
            <Description className={o(ov, OV_TEXT)}>Description</Description>
            <FieldError isInvalid className={o(ov, OV_TEXT)}>
              Error
            </FieldError>
          </View>
        )}
      />
      {BOOLS.map((isDisabled) => (
        <Pair
          key={String(isDisabled)}
          id={`select-trigger/dis=${isDisabled}`}
          render={(ov) => (
            <Select isDisabled={isDisabled}>
              <Select.Trigger className={o(ov, OV_VIEW)}>
                <Select.Value placeholder="Choose" className={o(ov, OV_TEXT)} />
                <Select.TriggerIndicator className={o(ov, OV_BOX)} />
              </Select.Trigger>
            </Select>
          )}
        />
      ))}
    </Section>

    <Section title="Buttons & lists">
      <Pair
        id="link-button"
        render={(ov) => (
          <LinkButton className={o(ov, OV_VIEW)}>
            <LinkButton.Label className={o(ov, OV_TEXT)}>Link</LinkButton.Label>
          </LinkButton>
        )}
      />
      <Pair
        id="close-button"
        render={(ov) => <CloseButton className={o(ov, OV_VIEW)} />}
      />
      <Pair
        id="list-group"
        render={(ov) => (
          <ListGroup className={o(ov, OV_VIEW)}>
            <ListGroup.Item className={o(ov, OV_VIEW)}>
              <ListGroup.ItemPrefix className={o(ov, OV_VIEW)}>
                <Text>P</Text>
              </ListGroup.ItemPrefix>
              <ListGroup.ItemContent className={o(ov, OV_VIEW)}>
                <ListGroup.ItemTitle className={o(ov, OV_TEXT)}>
                  Title
                </ListGroup.ItemTitle>
                <ListGroup.ItemDescription className={o(ov, OV_TEXT)}>
                  Description
                </ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix className={o(ov, OV_VIEW)} />
            </ListGroup.Item>
          </ListGroup>
        )}
      />
      <Pair
        id="pressable-feedback"
        render={(ov) => (
          <PressableFeedback className={o(ov, OV_VIEW)}>
            <PressableFeedback.Highlight className={o(ov, OV_VIEW)} />
            <Text>Pressable</Text>
          </PressableFeedback>
        )}
      />
      <Pair
        id="pressable-feedback/ripple"
        render={(ov) => (
          <PressableFeedback className={o(ov, OV_VIEW)}>
            <PressableFeedback.Ripple className={o(ov, OV_VIEW)} />
            <Text>Ripple</Text>
          </PressableFeedback>
        )}
      />
    </Section>

    <Section title="Separator / Skeleton / Spinner / Slider">
      {(['thin', 'thick'] as const).flatMap((variant) =>
        (['horizontal', 'vertical'] as const).map((orientation) => (
          <Pair
            key={`${variant}-${orientation}`}
            id={`separator/${variant}/${orientation}`}
            render={(ov) => (
              <View className="h-8 flex-row">
                <Separator
                  variant={variant}
                  orientation={orientation}
                  className={o(ov, 'bg-[#ff00aa] h-[4px] w-[40px]')}
                />
              </View>
            )}
          />
        ))
      )}
      {BOOLS.map((isLoading) => (
        <Pair
          key={String(isLoading)}
          id={`skeleton/loading=${isLoading}`}
          render={(ov) => (
            <Skeleton isLoading={isLoading} className={o(ov, OV_VIEW)}>
              <Text>Loaded</Text>
            </Skeleton>
          )}
        />
      ))}
      <Pair
        id="skeleton-group"
        render={(ov) => (
          <SkeletonGroup isLoading className={o(ov, OV_VIEW)}>
            <SkeletonGroup.Item className={o(ov, OV_BOX)} />
            <SkeletonGroup.Item className={o(ov, OV_BOX)} />
          </SkeletonGroup>
        )}
      />
      {SIZES.map((size) => (
        <Pair
          key={size}
          id={`spinner/${size}`}
          render={(ov) => (
            <Spinner size={size} className={o(ov, OV_BOX)}>
              <Spinner.Indicator className={o(ov, OV_BOX)} />
            </Spinner>
          )}
        />
      ))}
      {(['horizontal', 'vertical'] as const).flatMap((orientation) =>
        BOOLS.map((isDisabled) => (
          <Pair
            key={`${orientation}-${isDisabled}`}
            id={`slider/${orientation}/dis=${isDisabled}`}
            render={(ov) => (
              <View className={orientation === 'vertical' ? 'h-32' : undefined}>
                <Slider
                  defaultValue={30}
                  orientation={orientation}
                  isDisabled={isDisabled}
                  className={o(ov, OV_VIEW)}
                >
                  <Slider.Output className={o(ov, OV_TEXT)} />
                  <Slider.Track className={o(ov, OV_VIEW)}>
                    <Slider.Fill
                      className={o(ov, 'bg-[#ff00aa] rounded-[3px]')}
                    />
                    <Slider.Thumb className={o(ov, OV_BOX)} />
                  </Slider.Track>
                </Slider>
              </View>
            )}
          />
        ))
      )}
    </Section>

    <Section title="Tabs / TagGroup / Accordion">
      {(['primary', 'secondary'] as const).map((variant) => (
        <Pair
          key={variant}
          id={`tabs/${variant}`}
          render={(ov) => (
            <Tabs
              value="a"
              onValueChange={noop}
              variant={variant}
              className={o(ov, OV_VIEW)}
            >
              <Tabs.List className={o(ov, OV_VIEW)}>
                <Tabs.Indicator
                  className={o(ov, 'bg-[#ff00aa] rounded-[3px]')}
                />
                {['a', 'b', 'c'].map((value) => (
                  <Tabs.Trigger
                    key={value}
                    value={value}
                    className={o(ov, OV_VIEW)}
                  >
                    <Tabs.Label className={o(ov, OV_TEXT)}>{value}</Tabs.Label>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs>
          )}
        />
      ))}
      {(['default', 'surface'] as const).flatMap((variant) =>
        SIZES.map((size) => (
          <Pair
            key={`${variant}-${size}`}
            id={`tag-group/${variant}/${size}`}
            render={(ov) => (
              <TagGroup
                variant={variant}
                size={size}
                selectionMode="single"
                selectedKeys={new Set(['a'])}
                disabledKeys={new Set(['c'])}
                className={o(ov, OV_VIEW)}
              >
                <TagGroup.List className={o(ov, OV_VIEW)}>
                  {['a', 'b', 'c'].map((id) => (
                    <TagGroup.Item key={id} id={id} className={o(ov, OV_VIEW)}>
                      <TagGroup.ItemLabel className={o(ov, OV_TEXT)}>
                        {id}
                      </TagGroup.ItemLabel>
                    </TagGroup.Item>
                  ))}
                </TagGroup.List>
              </TagGroup>
            )}
          />
        ))
      )}
      {(['default', 'surface'] as const).map((variant) => (
        <Pair
          key={variant}
          id={`accordion/${variant}`}
          render={(ov) => (
            <Accordion
              variant={variant}
              defaultValue="1"
              className={o(ov, OV_VIEW)}
            >
              {['1', '2'].map((value) => (
                <Accordion.Item
                  key={value}
                  value={value}
                  className={o(ov, OV_VIEW)}
                >
                  <Accordion.Trigger className={o(ov, OV_VIEW)}>
                    <Text>Trigger {value}</Text>
                    <Accordion.Indicator className={o(ov, OV_BOX)} />
                  </Accordion.Trigger>
                  <Accordion.Content className={o(ov, OV_VIEW)}>
                    <Text>Content {value}</Text>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        />
      ))}
    </Section>

    <Section title="Typography">
      {(
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'body',
          'body-sm',
          'body-xs',
          'code',
        ] as const
      ).map((type) => (
        <Pair
          key={type}
          id={`typography/type=${type}`}
          render={(ov) => (
            <Typography type={type} className={o(ov, OV_TEXT)}>
              {type}
            </Typography>
          )}
        />
      ))}
      {(['default', 'muted'] as const).map((color) => (
        <Pair
          key={color}
          id={`typography/color=${color}`}
          render={(ov) => (
            <Typography color={color} className={o(ov, OV_TEXT)}>
              {color}
            </Typography>
          )}
        />
      ))}
      {(['normal', 'medium', 'semibold', 'bold'] as const).map((weight) => (
        <Pair
          key={weight}
          id={`typography/weight=${weight}`}
          render={(ov) => (
            <Typography weight={weight} className={o(ov, OV_TEXT)}>
              {weight}
            </Typography>
          )}
        />
      ))}
      {(['start', 'center', 'end', 'justify'] as const).map((align) => (
        <Pair
          key={align}
          id={`typography/align=${align}`}
          render={(ov) => (
            <Typography align={align} className={o(ov, `${OV_TEXT} text-left`)}>
              {align}
            </Typography>
          )}
        />
      ))}
      <Pair
        id="typography/parts"
        render={(ov) => (
          <View>
            <Typography.Heading className={o(ov, OV_TEXT)}>
              Heading
            </Typography.Heading>
            <Typography.Paragraph className={o(ov, OV_TEXT)}>
              Paragraph
            </Typography.Paragraph>
            <Typography.Code className={o(ov, OV_TEXT)}>code</Typography.Code>
          </View>
        )}
      />
    </Section>

    <Section title="ScrollShadow">
      <Pair
        id="scroll-shadow"
        render={(ov) => (
          <ScrollShadow
            LinearGradientComponent={LinearGradient}
            className={o(ov, OV_VIEW)}
          >
            <ScrollView horizontal>
              <Text>
                Scrollable content that is wide enough to overflow the row
              </Text>
            </ScrollView>
          </ScrollShadow>
        )}
      />
    </Section>
  </View>
);
