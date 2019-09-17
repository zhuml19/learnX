import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import AssignmentBoard from '../components/AssignmentBoard';
import {INavigationScreen} from '../types/NavigationScreen';
import {useDarkMode} from 'react-native-dark-mode';
import {Navigation} from 'react-native-navigation';

export interface IAssignmentDetailScreenProps {
  readonly title: string;
  readonly deadline: string;
  readonly description?: string;
  readonly attachmentName?: string;
  readonly attachmentUrl?: string;
  readonly submittedAttachmentName?: string;
  readonly submittedAttachmentUrl?: string;
  readonly submitTime?: string;
  readonly grade?: number;
  readonly gradeLevel?: string;
  readonly gradeContent?: string;
  readonly courseName?: string;
}

const AssignmentDetailScreen: INavigationScreen<
  IAssignmentDetailScreenProps
> = props => {
  const isDarkMode = useDarkMode();

  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {
          component: {
            name: 'text',
            passProps: {
              children: props.courseName,
              style: {
                fontSize: 17,
                fontWeight: '500',
                color: isDarkMode ? 'white' : 'black',
              },
            },
          },
        },
      },
    });
  }, [isDarkMode, props.componentId, props.courseName]);

  return <AssignmentBoard {...props} />;
};

export default connect()(AssignmentDetailScreen);
