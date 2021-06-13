import type { IReposScreen } from 'domain/main/repos/screen';
import type { IAuthService } from 'domain/shared/auth/service';
import type { IFunctionsService } from 'domain/shared/functions/service';
import type { ILoadingService } from 'domain/shared/loading/service';
import type { Repo } from 'domain/main/repos/entity/repo';
import type { ListRenderItemInfo } from 'React-native';
import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Switch, Subheading, Title } from 'react-native-paper';
import { inject, singleton } from 'tsyringe';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  wrap: {
    padding: 12,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#ccc',
  },
  repo: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: '100%',
  },
  repoOwner: {
    marginBottom: 0,
  },
  repoName: {
    marginTop: 0,
  },
  switch: {
    justifyContent: 'center',
  },
});

@singleton()
export class ReposScreen implements IReposScreen {
  public constructor(
    @inject('IAuthService') private authService: IAuthService,
    @inject('IFunctionsService') private functionsService: IFunctionsService,
    @inject('ILoadingService') private loadingService: ILoadingService,
  ) {
  }

  public getComponent() {
    const component = memo(() => {
      const withLoading = this.loadingService.useLoading();
      const [isLoading, setIsLoading] = useState(false);
      const [page, setPage] = useState<number | null>(null);
      const [repos, setRepos] = useState<Repo[]>([]);
      const hasNext = useRef(true);
      const renderRepo = useCallback(({ item }: ListRenderItemInfo<Repo>) => {
        const handleValueChange = (value: boolean) => {
          withLoading(async () => {
            setRepos(repos => repos.map(repo => repo.id === item.id ? { ...repo, isEnabled: value } : repo));
            await this.functionsService.call(value ? 'onSelect' : 'offSelect', {
              repo: item,
            });
          }).then();
        };

        return <View style={styles.wrap}>
          <View style={styles.repo}>
            <Subheading style={styles.repoOwner}>{item.owner}</Subheading>
            <Title style={styles.repoName}>{item.name}</Title>
          </View>
          <View style={styles.switch}>
            <Switch
              value={item.isEnabled}
              onValueChange={handleValueChange}
            />
          </View>
        </View>;
      }, []);
      const keyExtractor = useCallback((item: Repo) => String(item.id), []);
      const handleRefresh = useCallback(() => {
        setPage(null);
        setRepos([]);
        hasNext.current = true;
      }, []);
      const handleLoadMore = useCallback(() => {
        if (!hasNext.current || isLoading) {
          return;
        }

        setPage((page ?? 1) + 1);
      }, [page, hasNext.current, isLoading]);

      useEffect(() => {
        (async () => {
          try {
            setIsLoading(true);
            const newRepos = await this.functionsService.call<Repo[]>('getUserRepos', { page: page ?? 1 });
            if (!newRepos.length) {
              hasNext.current = false;
            } else {
              setRepos(repos => [...repos, ...newRepos]);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        })();
      }, [page]);

      return <View style={styles.screen}>
        <FlatList
          data={repos}
          renderItem={renderRepo}
          keyExtractor={keyExtractor}
          refreshing={isLoading}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
        />
      </View>;
    });
    component.displayName = 'ReposScreen';

    return component;
  }
}
